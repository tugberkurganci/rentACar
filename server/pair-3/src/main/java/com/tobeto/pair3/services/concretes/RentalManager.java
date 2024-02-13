package com.tobeto.pair3.services.concretes;

import com.tobeto.pair3.core.exception.BusinessException;
import com.tobeto.pair3.core.messages.Messages;
import com.tobeto.pair3.core.utils.mapper.ModelMapperService;
import com.tobeto.pair3.entities.Car;
import com.tobeto.pair3.entities.Location;
import com.tobeto.pair3.entities.Rental;
import com.tobeto.pair3.repositories.RentalRepository;
import com.tobeto.pair3.services.abstracts.*;
import com.tobeto.pair3.services.businessrules.RentalRules;
import com.tobeto.pair3.services.dtos.requests.*;
import com.tobeto.pair3.services.dtos.responses.GetCarResponse;
import com.tobeto.pair3.services.dtos.responses.GetRentalResponse;

import lombok.AllArgsConstructor;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;


import java.math.BigDecimal;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@AllArgsConstructor
public class RentalManager implements RentalService {
    private final RentalRepository rentalRepository;
    private final ModelMapperService mapperService;

    private final CarService carService;

    private final UserService userService;

    private final RentalRules rentalRules;
    private final InvoiceService invoiceService;

    private final LocationService locationService;


    @Transactional(isolation = Isolation.SERIALIZABLE)
    public GetRentalResponse add(CreateRentalRequest createRentalRequest) {

        rentalRules.checkIsDateBeforeNow(createRentalRequest.getStartDate());
        rentalRules.checkEndDateIsBeforeStartDate(createRentalRequest.getEndDate(), createRentalRequest.getStartDate());
        Car car = carService.getOriginalCarById(createRentalRequest.getCarId());
        isSuitableToRent(car, createRentalRequest);
        checkIsUserExists(createRentalRequest.getUserId());
        rentalRules.checkIsRentalDateLongerThan25Days(createRentalRequest.getStartDate(), createRentalRequest.getEndDate());
        Rental rental = mapperService.forRequest().map(createRentalRequest, Rental.class);
        setActualKilometerToRentalInfo(rental, createRentalRequest);
        setLocationToRentalInfo(rental, createRentalRequest);
        setTotalPriceToRentalInfo(rental, createRentalRequest);
        Rental createdRental = rentalRepository.save(rental);
        invoiceService.add(new CreateInvoiceRequest(createdRental.getId()));
        GetRentalResponse response = mapperService.forResponse().map(createdRental, GetRentalResponse.class);
        return  response;
    }

    private void setLocationToRentalInfo(Rental rental, CreateRentalRequest createRentalRequest) {

        Location pickUpLocation=locationService.findByName(createRentalRequest.getPickUpLocation());
        Location dropOffLocation=locationService.findByName(createRentalRequest.getDropOffLocation());

        rental.setPickUpLocation(pickUpLocation);
        rental.setDropOffLocation(dropOffLocation);


    }


    @Transactional
    public void update(UpdateRentalRequest updateRentalRequest) {
        Rental rentalToUpdate = this.getOriginalRentalById(updateRentalRequest.getId());
        ifRequestReturnDateNotNullShouldUpdateReturnDate(updateRentalRequest, rentalToUpdate);
        ifRequestEndKilometerNotNullShouldUpdateRental(rentalToUpdate, updateRentalRequest);
        ifRequestTotalPriceNotNullShouldUpdateTotalPrice(rentalToUpdate, updateRentalRequest);
        ifRequestUserIdNotNullShouldUpdateUserId(rentalToUpdate, updateRentalRequest);
        ifRequestCarIdNotNullShouldUpdateCar(rentalToUpdate, updateRentalRequest);
        checkIsCarExist(rentalToUpdate);
        checkIsUserExists(rentalToUpdate.getUser().getId());
        rentalRepository.save(rentalToUpdate);
    }


    public Rental getOriginalRentalById(int id) {
        return rentalRepository.findById(id).orElseThrow(() ->
                new BusinessException((Messages.getMessageForLocale("rentACar.exception.rental.notfound", LocaleContextHolder.getLocale()))));

    }

    public void delete(int id) {
        Rental rental = this.getOriginalRentalById(id);
        rentalRepository.delete(rental);
    }

    @Override
    public BigDecimal getPrice(CreateRentalRequest createRentalRequest) {
        return setTotalPriceToRentalInfo(null, createRentalRequest);
    }

    @Override
    public Page<GetRentalResponse> getAllViaPage(Pageable pageable) {
        return rentalRepository.findAll(pageable).map(rental -> { GetRentalResponse getRentalResponse= mapperService.forResponse().map(rental, GetRentalResponse.class);

            getRentalResponse.setPickUpLocation(rental.getPickUpLocation().getName());
            getRentalResponse.setDropOffLocation(rental.getDropOffLocation().getName());
            return  getRentalResponse;

        });
    }

    @Override
    public List<GetRentalResponse> getRentalsByUserId(int id) {
        return rentalRepository.findByUserId(id).
                stream().
                map(rental -> mapperService.forResponse().map(rental, GetRentalResponse.class)).toList();
    }

    public List<GetRentalResponse> getAll() {
        List<Rental> rentalList = rentalRepository.findAll();
        List<GetRentalResponse> responseList = rentalList.stream()
                .map(rental ->{ GetRentalResponse getRentalResponse= mapperService.forResponse().map(rental, GetRentalResponse.class);

                    getRentalResponse.setPickUpLocation(rental.getPickUpLocation().getName());
                    getRentalResponse.setDropOffLocation(rental.getDropOffLocation().getName());
                    return  getRentalResponse;

                })
                .toList();
        return responseList;
    }

    public GetRentalResponse getById(int id) {
        Rental rental = this.getOriginalRentalById(id);
        return mapperService.forResponse().map(rental, GetRentalResponse.class);
    }

    private void isSuitableToRent(Car car, CreateRentalRequest createRentalRequest) {
        if (!carService.isReservable(car, new CreateRentableCarRequest(createRentalRequest))) {
            throw new BusinessException((Messages.getMessageForLocale("rentACar.exception.rental.reservable.notsuitable", LocaleContextHolder.getLocale())));
        }
        ;
    }

    private void ifRequestCarIdNotNullShouldUpdateCar(Rental rentalToUpdate, UpdateRentalRequest updateRentalRequest) {
        if (updateRentalRequest.getCarId() != 0) {
            rentalToUpdate.setCar(carService.getOriginalCarById(updateRentalRequest.getCarId()));
        }

    }

    private void ifRequestUserIdNotNullShouldUpdateUserId(Rental rentalToUpdate, UpdateRentalRequest updateRentalRequest) {

        if (updateRentalRequest.getUserId() != 0) {
            rentalToUpdate.setUser(userService.getOriginalUserById(updateRentalRequest.getUserId()));
        }
    }

    private void ifRequestTotalPriceNotNullShouldUpdateTotalPrice(Rental rentalToUpdate, UpdateRentalRequest updateRentalRequest) {
        if (updateRentalRequest.getTotalPrice() != null) {
            rentalToUpdate.setTotalPrice(updateRentalRequest.getTotalPrice());
        }
    }

    private void ifRequestEndKilometerNotNullShouldUpdateRental(Rental rentalToUpdate, UpdateRentalRequest updateRentalRequest) {
        if (updateRentalRequest.getEndKilometer() != 0 && updateRentalRequest.getCarId()!=0) {
            Car car = carService.getOriginalCarById(updateRentalRequest.getCarId());
            if (car.getKilometer() < updateRentalRequest.getEndKilometer()) {
                UpdateCarRequest updateCarRequest = UpdateCarRequest
                        .builder()
                        .year(car.getYear())
                        .colorName(car.getColor().getName())
                        .dailyPrice(car.getDailyPrice())
                        .id(car.getId())
                        .kilometer(updateRentalRequest.getEndKilometer())
                        .modelName(car.getModel().getName())
                        .plate(car.getPlate())
                        .location(car.getCurrentLocation().getName())
                        .status(car.getStatus().name())
                        .build();
                carService.update(updateCarRequest);
                rentalToUpdate.setEndKilometer(updateRentalRequest.getEndKilometer());
            } else {
                throw new BusinessException((Messages.getMessageForLocale("rentACar.exception.rental.endkilometer.low", LocaleContextHolder.getLocale())));
            }
        }
    }


    private void ifRequestReturnDateNotNullShouldUpdateReturnDate(UpdateRentalRequest updateRentalRequest, Rental rentalToUpdate) {
        if (updateRentalRequest.getReturnDate() != null) {
            rentalToUpdate.setReturnDate(updateRentalRequest.getReturnDate());
        }
    }


    private void checkIsUserExists(int userId) {
        if (!userService.existsById(userId)) {
            throw new BusinessException((Messages.getMessageForLocale("rentACar.exception.rental.user.notfound", LocaleContextHolder.getLocale())));
        }
    }

    private void checkIsCarExist(Rental  rental) {
        if(rental.getCar()==null)return;
        if (!carService.existsById(rental.getCar().getId()) ) {
            throw new BusinessException((Messages.getMessageForLocale("rentACar.exception.rental.car.notfound", LocaleContextHolder.getLocale())));
        }
    }

    private BigDecimal setTotalPriceToRentalInfo(Rental rental, CreateRentalRequest createRentalRequest) {
        GetCarResponse response2 = carService.getById(createRentalRequest.getCarId());
        BigDecimal dailyPrice = response2.getDailyPrice();
        long rentalTime = ChronoUnit.DAYS.between(createRentalRequest.getStartDate(), createRentalRequest.getEndDate());
        rentalTime++;
        BigDecimal totalPrice = dailyPrice.multiply(new BigDecimal(rentalTime));

        if (rental != null) {
            rental.setTotalPrice(totalPrice);
        }

        return totalPrice;
    }

    private void setActualKilometerToRentalInfo(Rental rental, CreateRentalRequest createRentalRequest) {
        GetCarResponse response = carService.getById(createRentalRequest.getCarId());
        Integer actualKilometers = response.getKilometer();
        rental.setStartKilometer(actualKilometers);
    }
    @Override
    public void updateRental(Rental rental) {
        rentalRepository.save(rental);
    }


}

package com.tobeto.pair3.services.concretes;

import com.tobeto.pair3.core.exception.BusinessException;
import com.tobeto.pair3.core.utils.mapper.ModelMapperService;
import com.tobeto.pair3.entities.Car;
import com.tobeto.pair3.entities.Rental;
import com.tobeto.pair3.repositories.RentalRepository;
import com.tobeto.pair3.services.abstracts.CarService;
import com.tobeto.pair3.services.abstracts.InvoiceService;
import com.tobeto.pair3.services.abstracts.RentalService;
import com.tobeto.pair3.services.abstracts.UserService;
import com.tobeto.pair3.services.businessrules.RentalRules;
import com.tobeto.pair3.services.dtos.requests.*;
import com.tobeto.pair3.services.dtos.responses.GetCarResponse;
import com.tobeto.pair3.services.dtos.responses.GetRentalResponse;

import lombok.AllArgsConstructor;
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





    @Transactional(isolation = Isolation.SERIALIZABLE)
    public GetRentalResponse add(CreateRentalRequest createRentalRequest) {

        rentalRules.checkIsDateBeforeNow(createRentalRequest.getStartDate());

        rentalRules.checkEndDateIsBeforeStartDate(createRentalRequest.getEndDate(),createRentalRequest.getStartDate());

        checkIsCarExist(createRentalRequest.getCarId());

        Car car =carService.getOriginalCarById(createRentalRequest.getCarId());

        if(!carService.isReservable(car,new CreateRentableCarRequest(createRentalRequest.getStartDate(),createRentalRequest.getEndDate()))){
            throw  new BusinessException("not suitable to reserve");
        };


        checkIsUserExists(createRentalRequest.getUserId());

        rentalRules.checkIsRentalDateLongerThan25Days(createRentalRequest.getStartDate(),createRentalRequest.getEndDate());

        Rental rental = mapperService.forRequest().map(createRentalRequest, Rental.class);

        setActualKilometerToRentalInfo(rental,createRentalRequest);

        setTotalPriceToRentalInfo(rental,createRentalRequest);

        Rental rental2 =   rentalRepository.save(rental);
        invoiceService.add(new CreateInvoiceRequest(rental2.getId()));
        GetRentalResponse  response = mapperService.forResponse().map(rental2, GetRentalResponse.class);
        return response;
    }


    public void update(UpdateRentalRequest updateRentalRequest) {
        Rental rentalToUpdate = rentalRepository.findById(updateRentalRequest.getId()).orElseThrow(() -> new BusinessException("there is no rental"));


        if(updateRentalRequest.getReturnDate()!=null){
            rentalToUpdate.setReturnDate(updateRentalRequest.getReturnDate());
        }
        if(updateRentalRequest.getEndKilometer()!=0){
            Car car = carService.getOriginalCarById(updateRentalRequest.getCarId());
            if (car.getKilometer()< updateRentalRequest.getEndKilometer()){
                UpdateCarRequest updateCarRequest = UpdateCarRequest
                        .builder()
                        .year(car.getYear())
                        .colorName(car.getColor().getId())
                        .dailyPrice(car.getDailyPrice())
                        .id(car.getId())
                        .kilometer(updateRentalRequest.getEndKilometer())
                        .modelName(car.getModel().getId())
                        .plate(car.getPlate())
                        .build();
                carService.update(updateCarRequest);
                rentalToUpdate.setEndKilometer(updateRentalRequest.getEndKilometer());
            }else {
                throw new BusinessException("End kilometer must be higher than start kilometer! ("+car.getKilometer()+")");
            }


        }
        if(updateRentalRequest.getTotalPrice()!=null){
            rentalToUpdate.setTotalPrice(updateRentalRequest.getTotalPrice());
        }
        if(updateRentalRequest.getUserId()!=0){
            rentalToUpdate.setUser(userService.getOriginalUserById(updateRentalRequest.getUserId()));
        }

        if(updateRentalRequest.getCarId()!=0){
            rentalToUpdate.setCar(carService.getOriginalCarById(updateRentalRequest.getCarId()));
        }



        checkIsCarExist(rentalToUpdate.getCar().getId());
        checkIsUserExists(rentalToUpdate.getUser().getId());


        rentalRepository.save(rentalToUpdate);
    }

    public void delete(int id) {
        Rental rental = rentalRepository.findById(id).orElseThrow();
        rentalRepository.delete(rental);
    }

    @Override
    public BigDecimal getPrice(CreateRentalRequest createRentalRequest) {

        return setTotalPriceToRentalInfo(null,createRentalRequest);
    }

    @Override
    public Page<GetRentalResponse> getAllViaPage(Pageable pageable) {
        return rentalRepository.findAll(pageable).map(rental -> mapperService.forResponse().map(rental, GetRentalResponse.class));
    }

    @Override
    public List<GetRentalResponse> getRentalsByUserId(int id) {
        return  rentalRepository.findByUserId(id).
                stream().
                map(rental-> mapperService.forResponse().map(rental,GetRentalResponse.class)).toList();
    }

    public List<GetRentalResponse> getAll() {
        List<Rental> rentalList = rentalRepository.findAll();
        List<GetRentalResponse> responseList = rentalList.stream()
                .map(rental -> mapperService.forResponse().map(rental, GetRentalResponse.class))
                .toList();
        return responseList;
    }

    public GetRentalResponse getById(int id) {
        Rental rental = rentalRepository.findById(id).orElseThrow();
        GetRentalResponse response = mapperService.forResponse().map(rental, GetRentalResponse.class);
        return response;
    }


    //////////////////////////////////////////////////////////////////////////////////
    ///////////////////////// Business Methods//////////////////////////////////////

    private void checkIsUserExists(int userId) {
        if(!userService.existsById(userId)) {
            throw new RuntimeException("there is no user with this id");
        }
    }

    private void checkIsCarExist(int carId) {
        if (!carService.existsById(carId)) {
            throw new RuntimeException("there is no car with this id");
        }
    }

    private BigDecimal setTotalPriceToRentalInfo(Rental rental, CreateRentalRequest createRentalRequest) {
        GetCarResponse response2= carService.getById(createRentalRequest.getCarId());
        BigDecimal dailyPrice=response2.getDailyPrice();
        long rentalTime= ChronoUnit.DAYS.between(createRentalRequest.getStartDate(),createRentalRequest.getEndDate());
        rentalTime++;
        BigDecimal totalPrice = dailyPrice.multiply(new BigDecimal(rentalTime));

        if(rental !=null) {
            rental.setTotalPrice(totalPrice);
        }

        return totalPrice;
    }

    private void setActualKilometerToRentalInfo(Rental rental, CreateRentalRequest createRentalRequest) {
        GetCarResponse response= carService.getById(createRentalRequest.getCarId());
        Integer actualKilometers=response.getKilometer();
        rental.setStartKilometer(actualKilometers);
    }


}

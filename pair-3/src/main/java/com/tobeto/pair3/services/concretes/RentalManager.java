package com.tobeto.pair3.services.concretes;

import com.tobeto.pair3.core.exception.BusinessException;
import com.tobeto.pair3.core.utils.mapper.ModelMapperService;
import com.tobeto.pair3.entities.Rental;
import com.tobeto.pair3.repositories.RentalRepository;
import com.tobeto.pair3.services.abstracts.CarService;
import com.tobeto.pair3.services.abstracts.RentalService;
import com.tobeto.pair3.services.abstracts.UserService;
import com.tobeto.pair3.services.businessrules.CarRules;
import com.tobeto.pair3.services.businessrules.RentalRules;
import com.tobeto.pair3.services.dtos.requests.CreateRentalRequest;
import com.tobeto.pair3.services.dtos.requests.UpdateRentalRequest;
import com.tobeto.pair3.services.dtos.responses.GetCarResponse;
import com.tobeto.pair3.services.dtos.responses.GetRentalResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
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






    public void add(CreateRentalRequest createRentalRequest) {

        rentalRules.checkIsDateBeforeNow(createRentalRequest.getStartDate());

        rentalRules.checkEndDateIsBeforeStartDate(createRentalRequest.getEndDate(),createRentalRequest.getStartDate());

        checkIsCarExist(createRentalRequest.getCarId());

        checkIsUserExists(createRentalRequest.getUserId());

        rentalRules.checkIsRentalDateLongerThan25Days(createRentalRequest.getStartDate(),createRentalRequest.getEndDate());

        Rental rental = mapperService.forRequest().map(createRentalRequest, Rental.class);

        setActualKılometerToRentalInfo(rental,createRentalRequest);

        setTotalPriceToRentalInfo(rental,createRentalRequest);

        rentalRepository.save(rental);
    }


    public void update(UpdateRentalRequest updateRentalRequest) {
        Rental rentalToUpdate = rentalRepository.findById(updateRentalRequest.getId()).orElseThrow(() -> new BusinessException("there is no rental"));
        Rental rental=new Rental();

        if(updateRentalRequest.getReturnDate()!=null){
            rental.setReturnDate(updateRentalRequest.getReturnDate());
        }
        if(updateRentalRequest.getEndKilometer()!=0){
            rental.setEndKilometer(updateRentalRequest.getEndKilometer());
        }
        if(updateRentalRequest.getTotalPrice()!=null){
            rental.setTotalPrice(updateRentalRequest.getTotalPrice());
        }
        if(updateRentalRequest.getUserId()!=0){
            rental.setUser(userService.getOriginalUserById(updateRentalRequest.getUserId()));
        }

        if(updateRentalRequest.getCarId()!=0){
            rental.setCar(carService.getOriginalCarById(updateRentalRequest.getCarId()));
        }
        rental.setStartKilometer(rentalToUpdate.getStartKilometer());
        rental.setStartDate(rentalToUpdate.getStartDate());
        rental.setEndDate(rentalToUpdate.getEndDate());


        checkIsCarExist(rentalToUpdate.getUser().getId());
        checkIsUserExists(rentalToUpdate.getUser().getId());


        rentalRepository.save(rentalToUpdate);
    }

    public void delete(int id) {
        Rental rental = rentalRepository.findById(id).orElseThrow();
        rentalRepository.delete(rental);
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

    private void setTotalPriceToRentalInfo(Rental rental, CreateRentalRequest createRentalRequest) {
        GetCarResponse response2= carService.getById(createRentalRequest.getCarId());
        BigDecimal dailyPrice=response2.getDailyPrice();
        long rentalTime= ChronoUnit.DAYS.between(createRentalRequest.getStartDate(),createRentalRequest.getEndDate());
        BigDecimal totalPrice = dailyPrice.multiply(new BigDecimal(rentalTime));
        rental.setTotalPrice(totalPrice);
    }

    private void setActualKılometerToRentalInfo(Rental rental, CreateRentalRequest createRentalRequest) {
        GetCarResponse response= carService.getById(createRentalRequest.getCarId());
        Integer actualKilometers=response.getKilometer();
        rental.setStartKilometer(actualKilometers);
    }


}

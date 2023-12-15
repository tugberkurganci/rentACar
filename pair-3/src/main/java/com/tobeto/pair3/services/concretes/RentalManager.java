package com.tobeto.pair3.services.concretes;

import com.tobeto.pair3.core.utils.mapper.ModelMapperService;
import com.tobeto.pair3.entities.Rental;
import com.tobeto.pair3.repositories.RentalRepository;
import com.tobeto.pair3.services.abstracts.CarService;
import com.tobeto.pair3.services.abstracts.RentalService;
import com.tobeto.pair3.services.abstracts.UserService;
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





    public void add(CreateRentalRequest createRentalRequest) {

        if(createRentalRequest.getStartDate().isBefore(LocalDate.now())){

            throw new RuntimeException("Start date cannot be in the past");
        }

        if (createRentalRequest.getEndDate().isBefore(createRentalRequest.getStartDate())) {
            throw new RuntimeException("End date cannot be before the start date");
        }

        if (!carService.existsById(createRentalRequest.getCarId())) {
            throw new RuntimeException("there is no car with this id");
        }

        if(!userService.existsById(createRentalRequest.getUserId())){
            throw new RuntimeException("there is no user with this id");
        }

        if( ChronoUnit.DAYS.between(createRentalRequest.getStartDate(),createRentalRequest.getEndDate())>25){

            throw new RuntimeException("its no longer than 25 days");

        }

        //car daily price
        // rental süresi  end date -startdate

        Rental rental = mapperService.forRequest().map(createRentalRequest, Rental.class);

        GetCarResponse response= carService.getById(createRentalRequest.getCarId());
        Integer actualKilometers=response.getKilometer();
        rental.setStartKilometer(actualKilometers);

        GetCarResponse response2= carService.getById(createRentalRequest.getCarId());
        BigDecimal dailyPrice=response2.getDailyPrice();
        long rentalTime= ChronoUnit.DAYS.between(createRentalRequest.getStartDate(),createRentalRequest.getEndDate());
        BigDecimal totalPrice = dailyPrice.multiply(new BigDecimal(rentalTime));

        rental.setTotalPrice(totalPrice);



        rentalRepository.save(rental);
    }

    public void update(UpdateRentalRequest updateRentalRequest) {
        Rental rentalToUpdate = rentalRepository.findById(updateRentalRequest.getId()).orElseThrow();
        mapperService.forRequest().map(updateRentalRequest, rentalToUpdate);
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
}

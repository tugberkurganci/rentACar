package com.tobeto.pair3.services.concretes;

import com.tobeto.pair3.core.utils.mapper.ModelMapperService;
import com.tobeto.pair3.entities.Car;
import com.tobeto.pair3.entities.Color;
import com.tobeto.pair3.entities.Model;
import com.tobeto.pair3.entities.Rental;
import com.tobeto.pair3.repositories.CarRepository;
import com.tobeto.pair3.services.abstracts.CarService;
import com.tobeto.pair3.services.abstracts.ColorService;
import com.tobeto.pair3.services.abstracts.ModelService;
import com.tobeto.pair3.services.businessrules.RentalRules;
import com.tobeto.pair3.services.dtos.requests.CreateCarRequest;
import com.tobeto.pair3.services.dtos.requests.CreateRentableCarRequest;
import com.tobeto.pair3.services.dtos.requests.UpdateCarRequest;
import com.tobeto.pair3.services.dtos.responses.GetAllUsersResponse;
import com.tobeto.pair3.services.dtos.responses.GetCarResponse;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class CarManager implements CarService {
    private final CarRepository carRepository;
    private final ModelService modelService;
    private final ColorService colorService;
    private final ModelMapperService mapperService;

    private final RentalRules rentalRules;


    public void add(CreateCarRequest createCarRequest) {
        if (carRepository.existsByPlate(createCarRequest.getPlate())) {
            throw new RuntimeException("aynı plaka mevcut");
        }
        if (!colorService.existsColorById(createCarRequest.getColorId())) {
            throw new RuntimeException("Böyle bir renk yok");
        }
        modelService.getById(createCarRequest.getModelId());
        Car car = mapperService.forRequest().map(createCarRequest, Car.class);
        carRepository.save(car);
    }

    public void update(UpdateCarRequest updateCarRequest) {

        Car carToUpdate = carRepository.findById(updateCarRequest.getId()).orElseThrow();
        Color color = colorService.getOriginalColorById(updateCarRequest.getColorName());
        Model model = modelService.getOriginalModelById(updateCarRequest.getModelName());
        Car car = Car
                .builder()
                .id(updateCarRequest.getId())
                .color(color)
                .model(model)
                .year(updateCarRequest.getYear())
                .dailyPrice(updateCarRequest.getDailyPrice())
                .plate(updateCarRequest.getPlate())
                .kilometer(updateCarRequest.getKilometer())
                .rentals(carToUpdate.getRentals())
                .build();

        carRepository.save(car);
    }

    public void delete(Integer id) {
        Car car = carRepository.findById(id).orElseThrow();
        carRepository.delete(car);
    }

    public List<GetCarResponse> getAll() {
        List<Car> carList = carRepository.findAll();
        List<GetCarResponse> responseList = carList.stream()
                .map(car -> mapperService.forResponse().map(car, GetCarResponse.class))
                .toList();
        return responseList;
    }

    public GetCarResponse getById(Integer id) {
        Car car = carRepository.findById(id).orElseThrow();
        GetCarResponse response = mapperService.forResponse().map(car, GetCarResponse.class);
        return response;
    }

    @Override
    public boolean existsById(int carId) {
        return carRepository.existsById(carId);
    }

    @Override
    public Car getOriginalCarById(int carId) {
        return carRepository.findById(carId).orElseThrow();
    }

    @Override
    public List<GetCarResponse> getRentableCars(CreateRentableCarRequest request) {

        rentalRules.checkIsDateBeforeNow(request.getStartDate());
        rentalRules.checkEndDateIsBeforeStartDate(request.getEndDate(),request.getEndDate());
        rentalRules.checkIsRentalDateLongerThan25Days(request.getStartDate(),request.getEndDate());


        List<Car> carList = carRepository.findAll();
        List<Car> rentableCarList = new ArrayList<>();

        carList.forEach(car -> {
            if (isReservable(car, request)) {
                rentableCarList.add(car);
            }

        });

        return rentableCarList.stream().map(car -> mapperService.forResponse().map(car,GetCarResponse.class)).toList();
    }

    public boolean isReservable(Car car, CreateRentableCarRequest request) {

        boolean isReserable = true;


        List<Rental> rentals = car.getRentals();

        for (Rental rental : rentals) {


            if (rental.getEndDate().isBefore(request.getStartDate()) || rental.getStartDate().isAfter(request.getEndDate())) {


            } else {
                isReserable = false;
                break;
            }
        }

        return isReserable;
    }

    @Override
    public Page<GetCarResponse> getAllViaPage(Pageable pageable) {
        return carRepository.findAll(pageable).map(car -> mapperService.forResponse().map(car, GetCarResponse.class));
    }

}

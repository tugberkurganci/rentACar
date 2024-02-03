package com.tobeto.pair3.services.concretes;

import com.tobeto.pair3.core.exception.BusinessException;
import com.tobeto.pair3.core.messages.Messages;
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
import org.springframework.context.i18n.LocaleContextHolder;
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
    private final FileService fileService;


    public void add(CreateCarRequest createCarRequest) {


        checkExistByPlate(createCarRequest.getPlate());

        Model model=modelService.getOriginalModelById(createCarRequest.getModelName());
        Color color= colorService.getOriginalColorById(createCarRequest.getColorName());
        Car car = Car
                .builder()
                .color(color)
                .model(model)
                .year(createCarRequest.getYear())
                .dailyPrice(createCarRequest.getDailyPrice())
                .plate(createCarRequest.getPlate())
                .kilometer(createCarRequest.getKilometer())
                .build();


        if(createCarRequest.getImage()!=null){String fileName=fileService.saveBase64StringAsFile(createCarRequest.getImage(),"car"); car.setImage(fileName);}

        carRepository.save(car);
    }



    public void update(UpdateCarRequest updateCarRequest) {

        Car carToUpdate = this.getOriginalCarById(updateCarRequest.getId());
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
                .image(carToUpdate.getImage())
                .build();

       if(updateCarRequest.getImage()!=null){  String fileName=fileService.saveBase64StringAsFile(updateCarRequest.getImage(),"car");
           fileService.deleteCarImage(carToUpdate.getImage(),"car");
           car.setImage(fileName);}

        carRepository.save(car);
    }

    public void delete(Integer id) {
        Car car = this.getOriginalCarById(id);
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
        Car car = this.getOriginalCarById(id);
        GetCarResponse response = mapperService.forResponse().map(car, GetCarResponse.class);
        return response;
    }

    @Override
    public boolean existsById(int carId) {
        return carRepository.existsById(carId);
    }

    @Override
    public Car getOriginalCarById(int carId) {
        return carRepository.findById(carId).orElseThrow(() ->
                new BusinessException(Messages.getMessageForLocale("rentACar.exception.rental.car.notfound", LocaleContextHolder.getLocale())));
    }

    @Override
    public List<GetCarResponse> getRentableCars(CreateRentableCarRequest request) {

        rentalRules.checkIsDateBeforeNow(request.getStartDate());
        rentalRules.checkEndDateIsBeforeStartDate(request.getEndDate(),request.getEndDate());
        rentalRules.checkIsRentalDateLongerThan25Days(request.getStartDate(),request.getEndDate());
        List<Car> carList = carRepository.findAll();
        List<Car> rentableCarList = new ArrayList<>();
        convertToRentableCarList(carList,rentableCarList,request);
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

    private void checkExistByPlate(String plate) {

        if (carRepository.existsByPlate(plate)) {
            throw new BusinessException(Messages.getMessageForLocale("rentACar.exception.same.plate.exists", LocaleContextHolder.getLocale()));
        }
    }

    @Override
    public Page<GetCarResponse> searchKeyAndGetUser(String searchKey, Pageable pageable) {
        return carRepository.searchKeyAndGetUser(searchKey,pageable);
    }

    private void convertToRentableCarList(List<Car> carList, List<Car> rentableCarList, CreateRentableCarRequest request) {

        carList.forEach(car -> {
            if (isReservable(car, request)) {
                rentableCarList.add(car);
            }
        });
    }

}

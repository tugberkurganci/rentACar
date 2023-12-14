package com.tobeto.pair3.services.concretes;

import com.tobeto.pair3.core.utils.mapper.ModelMapperService;
import com.tobeto.pair3.entities.Car;
import com.tobeto.pair3.repositories.CarRepository;
import com.tobeto.pair3.services.abstracts.CarService;
import com.tobeto.pair3.services.abstracts.ColorService;
import com.tobeto.pair3.services.abstracts.ModelService;
import com.tobeto.pair3.services.dtos.requests.CreateCarRequest;
import com.tobeto.pair3.services.dtos.requests.UpdateCarRequest;
import com.tobeto.pair3.services.dtos.responses.GetCarResponse;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CarManager implements CarService {
    private final CarRepository carRepository;
    private final ModelService modelService;
    private final ColorService colorService;
    private final ModelMapperService mapperService;


    public void add(CreateCarRequest createCarRequest) {
        if(carRepository.existsByPlate(createCarRequest.getPlate())){
            throw new RuntimeException("aynı plaka mevcut");
        }
        if (!colorService.existsColorById(createCarRequest.getColorId())){
            throw new RuntimeException("Böyle bir renk yok");
        }
        modelService.getById(createCarRequest.getModelId());
        Car car = mapperService.forRequest().map(createCarRequest, Car.class);
        carRepository.save(car);
    }

    public void update(UpdateCarRequest updateCarRequest) {

        Car carToUpdate = carRepository.findById(updateCarRequest.getId()).orElseThrow();

        mapperService.forRequest().map(updateCarRequest, carToUpdate);

        carRepository.save(carToUpdate);
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
}

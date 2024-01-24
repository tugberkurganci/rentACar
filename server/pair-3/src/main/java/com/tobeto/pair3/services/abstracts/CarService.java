package com.tobeto.pair3.services.abstracts;

import com.tobeto.pair3.entities.Car;
import com.tobeto.pair3.services.dtos.requests.*;
import com.tobeto.pair3.services.dtos.responses.GetAllBrandResponse;
import com.tobeto.pair3.services.dtos.responses.GetAllUsersResponse;
import com.tobeto.pair3.services.dtos.responses.GetBrandResponse;
import com.tobeto.pair3.services.dtos.responses.GetCarResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CarService {

    public void add(CreateCarRequest createCarRequest);

    void update(UpdateCarRequest updateCarRequest);

    void delete(Integer id);

    List<GetCarResponse> getAll();

    GetCarResponse getById(Integer id);


    boolean existsById(int carId);

    Car getOriginalCarById(int carId);

    List<GetCarResponse> getRentableCars(CreateRentableCarRequest request);

    public boolean isReservable(Car car, CreateRentableCarRequest request) ;

    Page<GetCarResponse> getAllViaPage(Pageable pageable);
}

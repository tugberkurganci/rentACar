package com.tobeto.pair3.services.abstracts;

import com.tobeto.pair3.services.dtos.requests.CreateBrandRequest;
import com.tobeto.pair3.services.dtos.requests.CreateCarRequest;
import com.tobeto.pair3.services.dtos.requests.UpdateBrandRequest;
import com.tobeto.pair3.services.dtos.requests.UpdateCarRequest;
import com.tobeto.pair3.services.dtos.responses.GetAllBrandResponse;
import com.tobeto.pair3.services.dtos.responses.GetBrandResponse;
import com.tobeto.pair3.services.dtos.responses.GetCarResponse;

import java.util.List;

public interface CarService {

    public void add(CreateCarRequest createCarRequest);

    void update(UpdateCarRequest updateCarRequest);

    void delete(Integer id);

    List<GetCarResponse> getAll();

    GetCarResponse getById(Integer id);
}

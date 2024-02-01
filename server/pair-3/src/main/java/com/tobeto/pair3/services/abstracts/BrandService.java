package com.tobeto.pair3.services.abstracts;

import com.tobeto.pair3.entities.Brand;
import com.tobeto.pair3.services.dtos.requests.CreateBrandRequest;
import com.tobeto.pair3.services.dtos.requests.UpdateBrandRequest;
import com.tobeto.pair3.services.dtos.responses.GetAllBrandResponse;
import com.tobeto.pair3.services.dtos.responses.GetBrandResponse;

import java.util.List;

public interface BrandService {

    public void add(CreateBrandRequest createBrandRequest);

    void update(UpdateBrandRequest updateBrandRequest);

    void delete(Integer id);

    List<GetAllBrandResponse> getAll();

    GetBrandResponse getById(Integer id);
    Brand getByOriginalId(Integer id);

    public void checkExistsById(Integer brandId) ;
    public void checkExistByName(String name) ;
}

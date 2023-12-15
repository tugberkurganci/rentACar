package com.tobeto.pair3.services.concretes;

import com.tobeto.pair3.core.utils.mapper.ModelMapperService;
import com.tobeto.pair3.entities.Brand;
import com.tobeto.pair3.repositories.BrandRepository;
import com.tobeto.pair3.services.abstracts.BrandService;
import com.tobeto.pair3.services.dtos.requests.CreateBrandRequest;
import com.tobeto.pair3.services.dtos.requests.UpdateBrandRequest;
import com.tobeto.pair3.services.dtos.responses.GetAllBrandResponse;
import com.tobeto.pair3.services.dtos.responses.GetBrandResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@AllArgsConstructor
@Service
public class BrandManager implements BrandService {
    private final BrandRepository brandRepository;
    private final ModelMapperService mapperService;
    @Override
    public void add(CreateBrandRequest createBrandRequest) {
        /*Brand brand = new Brand();
        brand.setName(createBrandRequest.getName());*/
        if(brandRepository.existsByName(createBrandRequest.getName())){
            throw new RuntimeException("brand is already exists");
        }
        Brand brand = mapperService.forRequest().map(createBrandRequest, Brand.class);
        brandRepository.save(brand);
    }

    @Override
    public void update(UpdateBrandRequest updateBrandRequest) {
       /* Brand brand = brandRepository.findById(updateBrandRequest.getId()).orElseThrow();
        brand.setName(updateBrandRequest.getName());*/
        Brand brand = mapperService.forRequest().map(updateBrandRequest, Brand.class);
        brandRepository.save(brand);
    }

    @Override
    public void delete(Integer id) {
        Brand brand = brandRepository.findById(id).orElseThrow();
        brandRepository.delete(brand);

    }

    @Override
    public List<GetAllBrandResponse> getAll() {
        List<Brand> brandList = brandRepository.findAll();
               /* .stream()
                .map(GetAllBrandResponse::new)
                .toList();*/
        List<GetAllBrandResponse> responseList = brandList.stream().map(
                brand -> mapperService.forResponse().map(brand,GetAllBrandResponse.class)
        ).toList();



       /* List<Brand> brandList1 = brandRepository.findAll();
        List<GetAllBrandResponse> responseList = new ArrayList<>();
        for (Brand brand:brandList1) {
            GetAllBrandResponse response = new GetAllBrandResponse();
            response.setId(brand.getId());
            response.setName(brand.getName());
            responseList.add(response);

        }*/

        return responseList;
    }

    @Override
    public GetBrandResponse getById(Integer id) {
        Brand brand = brandRepository.findById(id).orElseThrow();
        GetBrandResponse response = mapperService.forResponse().map(brand,GetBrandResponse.class);


        return response;
    }

    @Override
    public boolean existsById(Integer brandId) {
        return brandRepository.existsById(brandId);
    }
}

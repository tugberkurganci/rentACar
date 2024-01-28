package com.tobeto.pair3.services.concretes;

import com.tobeto.pair3.core.exception.BusinessException;
import com.tobeto.pair3.core.messages.Messages;
import com.tobeto.pair3.core.utils.mapper.ModelMapperService;
import com.tobeto.pair3.entities.Brand;
import com.tobeto.pair3.repositories.BrandRepository;
import com.tobeto.pair3.services.abstracts.BrandService;
import com.tobeto.pair3.services.dtos.requests.CreateBrandRequest;
import com.tobeto.pair3.services.dtos.requests.UpdateBrandRequest;
import com.tobeto.pair3.services.dtos.responses.GetAllBrandResponse;
import com.tobeto.pair3.services.dtos.responses.GetBrandResponse;
import lombok.AllArgsConstructor;
import org.springframework.context.i18n.LocaleContextHolder;
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
            throw new BusinessException(Messages.getMessageForLocale("rentACar.exception.brand.exists", LocaleContextHolder.getLocale()));
        }
        Brand brand = mapperService.forRequest().map(createBrandRequest, Brand.class);
        brandRepository.save(brand);
    }

    @Override
    public void update(UpdateBrandRequest updateBrandRequest) {
       /* Brand brand = brandRepository.findById(updateBrandRequest.getId()).orElseThrow();
        brand.setName(updateBrandRequest.getName());*/
        Brand brand=brandRepository.findById(updateBrandRequest.getId()).orElseThrow();
        mapperService.forRequest().map(updateBrandRequest,brand);
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

        return responseList;
    }

    @Override
    public GetBrandResponse getById(Integer id) {
        Brand brand = brandRepository.findById(id).orElseThrow();
        GetBrandResponse response = mapperService.forResponse().map(brand,GetBrandResponse.class);


        return response;
    }

    @Override
    public Brand getByOriginalId(Integer id) {
        return brandRepository.findById(id).orElseThrow(() ->  new BusinessException(Messages.getMessageForLocale("rentACar.exception.brand.notfound", LocaleContextHolder.getLocale())));
    }

    @Override
    public boolean existsById(Integer brandId) {
        return brandRepository.existsById(brandId);
    }
}

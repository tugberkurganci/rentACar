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

        checkExistByName(createBrandRequest.getName());
        Brand brand = mapperService.forRequest().map(createBrandRequest, Brand.class);
        brandRepository.save(brand);
    }



    @Override
    public void update(UpdateBrandRequest updateBrandRequest) {

        Brand brand=this.getByOriginalId(updateBrandRequest.getId());
        checkExistByName(updateBrandRequest.getName());
        mapperService.forRequest().map(updateBrandRequest,brand);
        brandRepository.save(brand);
    }

    @Override
    public void delete(Integer id) {
        Brand brand = this.getByOriginalId(id);
        brandRepository.delete(brand);

    }

    @Override
    public List<GetAllBrandResponse> getAll() {
        List<Brand> brandList = brandRepository.findAll();
        List<GetAllBrandResponse> responseList = brandList.stream().map(
                brand -> mapperService.forResponse().map(brand,GetAllBrandResponse.class)
        ).toList();
        return responseList;
    }

    @Override
    public GetBrandResponse getById(Integer id) {
        Brand brand = getByOriginalId(id);
        GetBrandResponse response = mapperService.forResponse().map(brand,GetBrandResponse.class);
        return response;
    }

    @Override
    public Brand getByOriginalId(Integer id) {
        return brandRepository.findById(id).orElseThrow(() ->
                new BusinessException(Messages.getMessageForLocale("rentACar.exception.brand.notfound", LocaleContextHolder.getLocale())));
    }

    public void checkExistByName(String name) {
        if(brandRepository.existsByName(name)){
            throw new BusinessException(Messages.getMessageForLocale("rentACar.exception.brand.exists", LocaleContextHolder.getLocale()));
        }

    }

    public void checkExistsById(Integer brandId) {
        if(!brandRepository.existsById(brandId)){
            throw new BusinessException(Messages.getMessageForLocale("rentACar.exception.brand.notfound", LocaleContextHolder.getLocale()));
        }
    }

    @Override
    public Brand findByName(String brandName) {
        Brand byName = brandRepository.findByName(brandName);

        if(byName==null)throw new
                BusinessException(Messages.getMessageForLocale("rentACar.exception.brand.notfound", LocaleContextHolder.getLocale()));
        return byName;

    }
}



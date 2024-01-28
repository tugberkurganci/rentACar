package com.tobeto.pair3.services.concretes;

import com.tobeto.pair3.core.exception.BusinessException;
import com.tobeto.pair3.core.messages.Messages;
import com.tobeto.pair3.core.utils.mapper.ModelMapperService;
import com.tobeto.pair3.entities.Brand;
import com.tobeto.pair3.entities.Model;
import com.tobeto.pair3.repositories.ModelRepository;
import com.tobeto.pair3.services.abstracts.BrandService;
import com.tobeto.pair3.services.abstracts.ModelService;
import com.tobeto.pair3.services.dtos.requests.CreateModelRequest;
import com.tobeto.pair3.services.dtos.requests.UpdateModelRequest;
import com.tobeto.pair3.services.dtos.responses.GetAllModelResponse;
import com.tobeto.pair3.services.dtos.responses.GetModelResponse;
import lombok.AllArgsConstructor;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@AllArgsConstructor
public class ModelManager implements ModelService {

    private final ModelRepository modelRepository;
    private final ModelMapperService mapperService;

    private final BrandService brandService;
    @Override
    public void add(CreateModelRequest createModelRequest) {

        if(modelRepository.existsByName(createModelRequest.getName())) {
            throw new BusinessException((Messages.getMessageForLocale("rentACar.exception.model.exists", LocaleContextHolder.getLocale())));
        } else if (
                !brandService.existsById(createModelRequest.getBrandId())
        ) {  throw new BusinessException((Messages.getMessageForLocale("rentACar.exception.model.brand.notfound", LocaleContextHolder.getLocale())));

        }


        Model model = mapperService.forRequest().map(createModelRequest, Model.class);
        modelRepository.save(model);
    }

    @Override
    public void update(UpdateModelRequest updateModelRequest) {

        Model model=modelRepository.findById(updateModelRequest.getId()).orElseThrow(() -> new BusinessException((Messages.getMessageForLocale("rentACar.exception.model.notfound", LocaleContextHolder.getLocale()))));
        Brand brand = brandService.getByOriginalId(updateModelRequest.getBrandId());
          model.setId(updateModelRequest.getId());
          model.setName(updateModelRequest.getName());
          model.setBrand(brand);
        modelRepository.save(model);
    }

    @Override
    public void delete(Integer id) {
        Model model = modelRepository.findById(id).orElseThrow();
        modelRepository.delete(model);

    }

    @Override
    public List<GetAllModelResponse> getAll() {
        List<Model> modelList = modelRepository.findAll();
        List<GetAllModelResponse> responseList = modelList.stream().map(
                model -> mapperService.forResponse().map(model,GetAllModelResponse.class)
        ).toList();
        return responseList;
    }

    @Override
    public Model getOriginalModelById(int modelId) {
        return modelRepository.findById(modelId).orElseThrow(() ->  new BusinessException((Messages.getMessageForLocale("rentACar.exception.model.notfound", LocaleContextHolder.getLocale()))));
    }

    @Override
    public Page<GetAllModelResponse> getAllViaPage(Pageable pageable) {
        return modelRepository.findAll(pageable).map(model -> mapperService.forResponse().map(model, GetAllModelResponse.class));
    }

    @Override
    public GetModelResponse getById(Integer id) {
        Model model = modelRepository.findById(id).orElseThrow( () ->  new BusinessException((Messages.getMessageForLocale("rentACar.exception.model.notfound", LocaleContextHolder.getLocale()))));
        GetModelResponse response = mapperService.forResponse().map(model,GetModelResponse.class);

        return response;
    }

}

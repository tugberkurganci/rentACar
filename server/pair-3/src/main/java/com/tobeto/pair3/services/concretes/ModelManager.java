package com.tobeto.pair3.services.concretes;

import com.tobeto.pair3.core.exception.BusinessException;
import com.tobeto.pair3.core.utils.mapper.ModelMapperService;
import com.tobeto.pair3.entities.Model;
import com.tobeto.pair3.repositories.ModelRepository;
import com.tobeto.pair3.services.abstracts.BrandService;
import com.tobeto.pair3.services.abstracts.ModelService;
import com.tobeto.pair3.services.dtos.requests.CreateModelRequest;
import com.tobeto.pair3.services.dtos.requests.UpdateModelRequest;
import com.tobeto.pair3.services.dtos.responses.GetAllModelResponse;
import com.tobeto.pair3.services.dtos.responses.GetModelResponse;
import lombok.AllArgsConstructor;
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
            throw new RuntimeException("model is already exists");
        } else if (
                !brandService.existsById(createModelRequest.getBrandId())
        ) { throw new RuntimeException("there is no brand you cant add ");
        }


        Model model = mapperService.forRequest().map(createModelRequest, Model.class);
        modelRepository.save(model);
    }

    @Override
    public void update(UpdateModelRequest updateModelRequest) {

        Model model=modelRepository.findById(updateModelRequest.getId()).orElseThrow();
         mapperService.forRequest().map(updateModelRequest, Model.class);
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
        return modelRepository.findById(modelId).orElseThrow(() -> new BusinessException(("Model not found!")));
    }

    @Override
    public GetModelResponse getById(Integer id) {
        Model model = modelRepository.findById(id).orElseThrow( () -> new RuntimeException("model yok"));
        GetModelResponse response = mapperService.forResponse().map(model,GetModelResponse.class);

        return response;
    }

}

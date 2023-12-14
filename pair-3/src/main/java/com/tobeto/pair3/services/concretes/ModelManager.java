package com.tobeto.pair3.services.concretes;

import com.tobeto.pair3.core.utils.mapper.ModelMapperService;
import com.tobeto.pair3.entities.Model;
import com.tobeto.pair3.repositories.ModelRepository;
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

    @Override
    public void add(CreateModelRequest createModelRequest) {

        Model model = mapperService.forRequest().map(createModelRequest, Model.class);
        modelRepository.save(model);
    }

    @Override
    public void update(UpdateModelRequest updateModelRequest) {

        Model model = mapperService.forRequest().map(updateModelRequest, Model.class);
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
    public GetModelResponse getById(Integer id) {
        Model model = modelRepository.findById(id).orElseThrow( () -> new RuntimeException("model yok"));
        GetModelResponse response = mapperService.forResponse().map(model,GetModelResponse.class);

        return response;
    }

}

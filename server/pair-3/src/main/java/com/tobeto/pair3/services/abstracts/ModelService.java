package com.tobeto.pair3.services.abstracts;

import com.tobeto.pair3.entities.Model;
import com.tobeto.pair3.services.dtos.requests.CreateModelRequest;
import com.tobeto.pair3.services.dtos.requests.UpdateModelRequest;
import com.tobeto.pair3.services.dtos.responses.GetAllModelResponse;
import com.tobeto.pair3.services.dtos.responses.GetAllUsersResponse;
import com.tobeto.pair3.services.dtos.responses.GetModelResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ModelService {



    void add(CreateModelRequest createModelRequest);

    void update(UpdateModelRequest updateModelRequest);

    void delete(Integer id);

    List<GetAllModelResponse> getAll();

    GetModelResponse getById(Integer id);


    Model getOriginalModelById(int modelId);

    Page<GetAllModelResponse> getAllViaPage(Pageable pageable);
}

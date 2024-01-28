package com.tobeto.pair3.controllers;
import com.tobeto.pair3.services.abstracts.ModelService;
import com.tobeto.pair3.services.dtos.requests.CreateModelRequest;
import com.tobeto.pair3.services.dtos.requests.UpdateModelRequest;
import com.tobeto.pair3.services.dtos.responses.GetAllModelResponse;
import com.tobeto.pair3.services.dtos.responses.GetAllUsersResponse;
import com.tobeto.pair3.services.dtos.responses.GetModelResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/models")
@AllArgsConstructor
public class ModelController {
    private final ModelService modelService;
    @PostMapping
    public void add (@RequestBody @Valid CreateModelRequest createModelRequest ){
        modelService.add(createModelRequest);
    }

    @PutMapping("{id}")
    public void update (@RequestBody @Valid UpdateModelRequest updateModelRequest ){
        modelService.update(updateModelRequest);
    }

    @DeleteMapping("{id}")
    public void delete (@PathVariable("id") Integer id ){
        modelService.delete(id);
    }

    @GetMapping
    public List<GetAllModelResponse> getAll(){
        return modelService.getAll();
    }

    @GetMapping("{id}")
    public GetModelResponse getById(@PathVariable("id")  Integer id){
        return modelService.getById(id);
    }
    @GetMapping("/via-page")
    public Page<GetAllModelResponse> getAllViaPage(Pageable pageable){
        return modelService.getAllViaPage(pageable);
    }
}







package com.tobeto.pair3.controllers;

import com.tobeto.pair3.services.abstracts.CarService;
import com.tobeto.pair3.services.dtos.requests.CreateCarRequest;
import com.tobeto.pair3.services.dtos.requests.UpdateCarRequest;
import com.tobeto.pair3.services.dtos.responses.GetCarResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/cars")
@AllArgsConstructor
public class CarController {

    private final CarService carService;

    @GetMapping
    public List<GetCarResponse> getAll() {
        return carService.getAll();
    }

    @GetMapping("{id}")
    public GetCarResponse getById(@PathVariable Integer id) {
        return carService.getById(id);
    }

    @PostMapping
    public void add(@RequestBody @Valid CreateCarRequest createCarRequest) {
        carService.add(createCarRequest);
    }

    @PutMapping
    public void update(@RequestBody @Valid UpdateCarRequest updateCarRequest) {
        carService.update(updateCarRequest);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Integer id) {
        carService.delete(id);
    }


}

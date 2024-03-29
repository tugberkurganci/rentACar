package com.tobeto.pair3.controllers;

import com.tobeto.pair3.services.abstracts.CarService;
import com.tobeto.pair3.services.dtos.requests.*;
import com.tobeto.pair3.services.dtos.responses.GetCarResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    public GetCarResponse getById(@PathVariable("id") Integer id) {
        return carService.getById(id);
    }

    @PostMapping("rentable-cars")
    public List<GetCarResponse> getRentableCars(@RequestBody @Valid CreateRentableCarRequest request)
    {
        return carService.getRentableCars(request);
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
    public void delete(@PathVariable("id") Integer id) {
        carService.delete(id);
    }
    @GetMapping("/via-page")
    public Page<GetCarResponse> getAllViaPage(Pageable pageable){
        return carService.getAllViaPage(pageable);
    }

    @GetMapping("/search-car")
    public Page<GetCarResponse> searchKeyAndGetCar(@RequestParam("searchKey") String searchKey,Pageable pageable){
        return carService.searchKeyAndGetUser(searchKey,pageable);
    }

    @PostMapping("/filter")
    public List<GetCarResponse> filterCars(@RequestBody @Valid FilterCarRequest filterCarRequest) {
        return carService.filterCars(filterCarRequest);
    }
    @PostMapping("/sort")
    public List<GetCarResponse> sortCars(@RequestBody @Valid SortCarsRequest sortCarsRequest) {
        return carService.sortCars(sortCarsRequest);
    }
}

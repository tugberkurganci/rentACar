package com.tobeto.pair3.controllers;

import com.tobeto.pair3.services.abstracts.RentalService;
import com.tobeto.pair3.services.dtos.requests.CreateRentalRequest;
import com.tobeto.pair3.services.dtos.requests.UpdateRentalRequest;
import com.tobeto.pair3.services.dtos.responses.GetRentalResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/rentals")
@AllArgsConstructor
public class RentalController {

    private final RentalService rentalService;

    @GetMapping
    public List<GetRentalResponse> getAll() {
        return rentalService.getAll();
    }

    @GetMapping("{id}")
    public GetRentalResponse getById(@PathVariable("id") int id) {
        return rentalService.getById(id);
    }

    @PostMapping
    public void add(@RequestBody @Valid CreateRentalRequest createRentalRequest) {
        rentalService.add(createRentalRequest);
    }

    @PutMapping
    public void update(@RequestBody @Valid UpdateRentalRequest updateRentalRequest) {
        rentalService.update(updateRentalRequest);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") int id) {
        rentalService.delete(id);
    }
}

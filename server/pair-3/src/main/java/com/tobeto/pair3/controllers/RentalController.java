package com.tobeto.pair3.controllers;

import com.tobeto.pair3.services.abstracts.RentalService;
import com.tobeto.pair3.services.dtos.requests.CreateRentalRequest;
import com.tobeto.pair3.services.dtos.requests.UpdateRentalRequest;
import com.tobeto.pair3.services.dtos.responses.GetCarResponse;
import com.tobeto.pair3.services.dtos.responses.GetRentalResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
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

    @GetMapping("/rentals-userid")
    public List<GetRentalResponse> getRentalsByUserId(@RequestParam("user") int id ){

        return rentalService.getRentalsByUserId(id);
    }

    @GetMapping("{id}")
    public GetRentalResponse getById(@PathVariable("id") int id) {
        return rentalService.getById(id);
    }

    @PostMapping
    public GetRentalResponse add(@RequestBody @Valid CreateRentalRequest createRentalRequest) {
        return rentalService.add(createRentalRequest);
    }
    @PostMapping("/total")
    public BigDecimal getPrice (@RequestBody CreateRentalRequest createRentalRequest ) {
        return rentalService.getPrice(createRentalRequest);

    }
    @PutMapping
    public void update(@RequestBody @Valid UpdateRentalRequest updateRentalRequest) {
        rentalService.update(updateRentalRequest);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") int id) {
        rentalService.delete(id);
    }
    @GetMapping("/via-page")
    public Page<GetRentalResponse> getAllViaPage(Pageable pageable){
        return rentalService.getAllViaPage(pageable);
    }
}

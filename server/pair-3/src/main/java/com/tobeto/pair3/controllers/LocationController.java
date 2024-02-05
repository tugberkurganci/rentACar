package com.tobeto.pair3.controllers;

import com.tobeto.pair3.services.abstracts.InvoiceService;
import com.tobeto.pair3.services.abstracts.LocationService;
import com.tobeto.pair3.services.dtos.requests.CreateInvoiceRequest;
import com.tobeto.pair3.services.dtos.requests.CreateLocationRequest;
import com.tobeto.pair3.services.dtos.requests.UpdateInvoiceRequest;
import com.tobeto.pair3.services.dtos.responses.GetInvoiceResponse;
import com.tobeto.pair3.services.dtos.responses.GetLocationResponse;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/v1/locations")
public class LocationController {
    private final LocationService locationService;



    @PostMapping
    public void add (@RequestBody CreateLocationRequest request ){
        locationService.add(request);
    }

    @GetMapping
    public List<GetLocationResponse> getAll() {

        return locationService.getAll();
    }
}


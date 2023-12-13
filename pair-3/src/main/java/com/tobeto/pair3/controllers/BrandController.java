package com.tobeto.pair3.controllers;

import com.tobeto.pair3.services.abstracts.BrandService;
import com.tobeto.pair3.services.dtos.requests.CreateBrandRequest;
import com.tobeto.pair3.services.dtos.requests.UpdateBrandRequest;
import com.tobeto.pair3.services.dtos.responses.GetAllBrandResponse;
import com.tobeto.pair3.services.dtos.responses.GetBrandResponse;
import lombok.AllArgsConstructor;
import org.hibernate.validator.constraints.Normalized;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("api/v1/brands")
public class BrandController {
    private final BrandService brandService;
    @PostMapping
    public void add (@RequestBody CreateBrandRequest createBrandRequest ){
        brandService.add(createBrandRequest);
    }
    @PutMapping("{id}")
    public void update (@RequestBody UpdateBrandRequest updateBrandRequest ){
        brandService.update(updateBrandRequest);
    }
    @DeleteMapping("{id}")
    public void delete (@PathVariable Integer id ){
        brandService.delete(id);
    }
    @GetMapping
    public List<GetAllBrandResponse> getAll(){

        return brandService.getAll();
    }
    @GetMapping("{id}")
    public GetBrandResponse getById(@PathVariable  Integer id){
        return brandService.getById(id);
    }
}

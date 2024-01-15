package com.tobeto.pair3.services.dtos.requests;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateBrandRequest {

    @Size(min = 2,message = "Brand name must contain more than 2  letter  ")
    private String name;
}

package com.tobeto.pair3.services.dtos.requests;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class CreateModelRequest {


    @Size(min = 2,message = "Model name must contain more than 2  letter  ")
    private String name;
    @Min(value = 1, message = "BrandId must be a positive value")
    private Integer brandId;
}

package com.tobeto.pair3.services.dtos.requests;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class CreateModelRequest {

    private String name;
    @Min(value = 1, message = "BrandId must be a positive value")
    private Integer brandId;
}

package com.tobeto.pair3.services.dtos.requests;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class CreateModelRequest {


    @Size(min = 2,message = "{rentACar.constraint.name.size}")
    private String name;
    @Min(value = 1, message = "{rentACar.constraint.brandId.min}")
    private Integer brandId;
}

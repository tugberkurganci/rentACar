package com.tobeto.pair3.services.dtos.requests;

import jakarta.validation.constraints.Min;
import lombok.Data;

@Data
public class UpdateModelRequest {
    private Integer id;
    private String name;
    @Min(value = 1, message = "BrandId must be a positive value")
    private Integer brandId;
}

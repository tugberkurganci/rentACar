package com.tobeto.pair3.services.dtos.requests;

import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateModelRequest {
    private Integer id;
    private String name;
    @Min(value = 1, message = "BrandId must be a positive value")
    private Integer brandId;
}

package com.tobeto.pair3.services.dtos.requests;


import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetBrandNameRequest {
    @NotNull String modelName;
}

package com.tobeto.pair3.services.dtos.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetBrandNameResponse {
    private String brandName;
    private int brandId;
}

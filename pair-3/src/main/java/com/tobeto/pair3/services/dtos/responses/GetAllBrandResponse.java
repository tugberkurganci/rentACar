package com.tobeto.pair3.services.dtos.responses;

import com.tobeto.pair3.entities.Brand;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GetAllBrandResponse {
    private Integer id;
    private String name;

    public GetAllBrandResponse(Brand brand) {
        this.id= brand.getId();
        this.name= brand.getName();
    }
}

package com.tobeto.pair3.services.dtos.responses;

import com.tobeto.pair3.entities.Brand;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetBrandResponse {


    private Integer id;
    private String name;

}

package com.tobeto.pair3.services.dtos.requests;

import com.tobeto.pair3.services.dtos.validaton.FileType;
import lombok.Data;

@Data
public class UpdateBrandRequest {
    private Integer id;
    private String name;

}

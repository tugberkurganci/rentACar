package com.tobeto.pair3.services.dtos.requests;

import com.tobeto.pair3.services.dtos.validaton.FileType;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateBrandRequest {

    @Size(min = 2,message = "{rentACar.constraint.name.size}")
    private String name;

}

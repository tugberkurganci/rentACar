package com.tobeto.pair3.services.dtos.requests;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateColorRequest {

    @Size(min = 2,message = "Color name must contain more than 2  letter  ")
    private String name;



}

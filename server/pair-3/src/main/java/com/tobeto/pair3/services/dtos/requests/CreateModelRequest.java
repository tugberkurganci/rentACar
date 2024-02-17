package com.tobeto.pair3.services.dtos.requests;
import com.tobeto.pair3.services.dtos.validaton.FileType;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class CreateModelRequest {


    @Size(min = 2,message = "{rentACar.constraint.name.size}")
    private String name;

    private String brandName;
    @FileType
    private String image;
}

package com.tobeto.pair3.services.dtos.responses;
import com.tobeto.pair3.entities.Model;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GetAllModelResponse {
    private Integer id;
    private String name;
    private Integer brandId;

    private String image;


}

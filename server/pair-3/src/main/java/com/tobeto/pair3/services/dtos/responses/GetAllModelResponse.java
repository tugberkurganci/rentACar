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

    public GetAllModelResponse(Model model) {
        this.id= model.getId();
        this.name= model.getName();
        this.brandId= model.getBrand().getId();

    }
}

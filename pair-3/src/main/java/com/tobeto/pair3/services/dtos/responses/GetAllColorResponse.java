package com.tobeto.pair3.services.dtos.responses;


import com.tobeto.pair3.entities.Color;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GetAllColorResponse {
    private int id;
    private String name;

    public GetAllColorResponse(Color color) {
        this.id= color.getId();
        this.name= color.getName();
    }




}

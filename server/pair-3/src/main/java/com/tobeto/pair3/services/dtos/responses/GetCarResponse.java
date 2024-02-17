package com.tobeto.pair3.services.dtos.responses;

import com.tobeto.pair3.entities.Color;
import com.tobeto.pair3.entities.Model;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetCarResponse {

    private int id;


    private int kilometer;


    private String plate;


    private int year;


    private BigDecimal dailyPrice;


    private String modelName;


    private String colorName;

    private String image;

    private String brandName;

    private String location;

    private String status;


    public GetCarResponse(int id, int kilometer, String plate, int year, BigDecimal dailyPrice, String modelName, String colorName, String image,String location) {
        this.id = id;
        this.kilometer = kilometer;
        this.plate = plate;
        this.year = year;
        this.dailyPrice = dailyPrice;
        this.modelName = modelName;
        this.colorName = colorName;
        this.image = image;
        this.location= location;
    }
}

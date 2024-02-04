package com.tobeto.pair3.services.dtos.requests;

import com.tobeto.pair3.services.dtos.responses.GetCarResponse;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
public class CarModel {


    private int id;
    private int year;
    private int kilometer;
    private String plate;
    private String colorName;
    private String brandName;
    private String modelName;
    private String image;
    private BigDecimal dailyPrice;

    public GetCarResponse getResponse(CarModel c) {
        GetCarResponse carModelResponse = new GetCarResponse();
        carModelResponse.setId(c.getId());
        carModelResponse.setYear(c.getYear());
        carModelResponse.setKilometer(c.getKilometer());
        carModelResponse.setPlate(c.getPlate());
        carModelResponse.setColorName(c.getColorName());
        carModelResponse.setBrandName(c.getBrandName());
        carModelResponse.setModelName(c.getModelName());
        carModelResponse.setImage(c.getImage());
        carModelResponse.setDailyPrice(c.getDailyPrice());
        return carModelResponse;
    }
}
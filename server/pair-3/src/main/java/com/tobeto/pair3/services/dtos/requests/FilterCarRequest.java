package com.tobeto.pair3.services.dtos.requests;

import lombok.Data;

import java.util.List;

@Data
public class FilterCarRequest {

    private String brandName;
    private String modelName;
    private int firstPrice;
    private int secondPrice;
    private int firstModelYear;
    private int secondModelYear;
    private List<CarModel> carList;
}
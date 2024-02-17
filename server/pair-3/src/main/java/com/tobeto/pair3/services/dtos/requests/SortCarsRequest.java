package com.tobeto.pair3.services.dtos.requests;

import lombok.Data;

import java.util.List;

@Data
public class SortCarsRequest {

    private String sortType;
    private List<CarModel> carList;

}
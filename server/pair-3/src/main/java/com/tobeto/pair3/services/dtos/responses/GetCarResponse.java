package com.tobeto.pair3.services.dtos.responses;

import com.tobeto.pair3.entities.Color;
import com.tobeto.pair3.entities.Model;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class GetCarResponse {

    private int id;


    private int kilometer;


    private String plate;


    private int year;


    private BigDecimal dailyPrice;


    private String modelName;


    private String colorName;


}

package com.tobeto.pair3.services.dtos.responses;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class GetRentalResponse {

    private LocalDate startDate;


    private LocalDate endDate;


    private LocalDate returnDate;


    private int startKilometer;


    private int endKilometer;


    private BigDecimal totalPrice;


    private int carId;


    private int userId;
}

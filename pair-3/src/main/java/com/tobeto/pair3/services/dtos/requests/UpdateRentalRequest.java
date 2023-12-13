package com.tobeto.pair3.services.dtos.requests;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class UpdateRentalRequest {

    private int id;

    private LocalDate startDate;


    private LocalDate endDate;


    private LocalDate returnDate;


    private int startKilometer;


    private int endKilometer;


    private BigDecimal totalPrice;


    private int carId;


    private int userId;
}

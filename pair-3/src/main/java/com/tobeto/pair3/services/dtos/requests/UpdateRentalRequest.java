package com.tobeto.pair3.services.dtos.requests;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class UpdateRentalRequest {

    private int id;

    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate startDate;

    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate endDate;

    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate returnDate;


    private int startKilometer;


    private int endKilometer;


    private BigDecimal totalPrice;


    private int carId;


    private int userId;
}

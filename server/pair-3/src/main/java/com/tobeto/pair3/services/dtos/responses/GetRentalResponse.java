package com.tobeto.pair3.services.dtos.responses;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class GetRentalResponse {
    private int id;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate endDate;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate returnDate;


    private int startKilometer;


    private Integer endKilometer;


    private BigDecimal totalPrice;


    private int carId;


    private int userId;
}

package com.tobeto.pair3.services.dtos.requests;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.tobeto.pair3.entities.Car;
import com.tobeto.pair3.entities.User;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class CreateRentalRequest {


    @NotNull(message = "{rentACar.constraint.start.date.notnull}")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;
   
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate endDate;

    private String pickUpLocation;

    private String dropOffLocation;

    private int carId;


    private int userId;
}

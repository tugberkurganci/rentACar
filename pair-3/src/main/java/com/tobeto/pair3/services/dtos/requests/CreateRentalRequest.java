package com.tobeto.pair3.services.dtos.requests;

import com.tobeto.pair3.entities.Car;
import com.tobeto.pair3.entities.User;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class CreateRentalRequest {



    private LocalDate startDate;


    private LocalDate endDate;


    private LocalDate returnDate;


    private int startKilometer;


    private int endKilometer;


    private BigDecimal totalPrice;


    private int carId;


    private int userId;
}

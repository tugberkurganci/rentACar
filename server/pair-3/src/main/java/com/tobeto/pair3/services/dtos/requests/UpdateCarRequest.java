package com.tobeto.pair3.services.dtos.requests;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateCarRequest {


    private int id;

    @Positive(message = "Kilometer must be a positive value")
    private int kilometer;

    @Pattern(regexp = "[0-9]{2}[A-Z]{1,3}[0-9]{1,4}", message = "Plate must be a valid Turkish plate")
    private String plate;

    @Min(value = 2005, message = "Year must be 2005 or later")
    @DecimalMax(value = "2024", message = "Year must be 2024 or earlier")
    private int year;

    @DecimalMin(value = "0", message = "Daily price must be a non-negative value")
    private BigDecimal dailyPrice;

    private int modelName;

    private int colorName;

    public void setPlate(String plate) {
        this.plate = plate.replaceAll("\\s", "");
    }
}

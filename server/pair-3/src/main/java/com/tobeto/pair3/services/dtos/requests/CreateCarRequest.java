package com.tobeto.pair3.services.dtos.requests;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class CreateCarRequest {


    @Positive(message = "Kilometer must be a positive value")
    private int kilometer;

    @Pattern(regexp = "^(0[1-9]|[1-7][0-9]|8[01])(([A-Z])(\\d{4,5})|([A-Z]{2})(\\d{3,4})|([A-Z]{3})(\\d{2,3}))$", message = "Plate must be a valid Turkish plate")
    private String plate;

    @Min(value = 2005, message = "Year must be 2005 or later")
    @DecimalMax(value = "2024", message = "Year must be 2024 or earlier")
    private int year;

    @DecimalMin(value = "0", message = "Daily price must be a non-negative value")
    private BigDecimal dailyPrice;

    @Min(value = 1, message = "ModelId must be a positive value")
    private int modelId;

    @Min(value = 1, message = "ColorId must be a positive value")
    private int colorId;

    public void setPlate(String plate) {
        this.plate = plate.replaceAll("\\s", "");
    }
}

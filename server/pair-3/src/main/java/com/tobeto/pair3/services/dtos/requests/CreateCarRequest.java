package com.tobeto.pair3.services.dtos.requests;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;


@Data
public class CreateCarRequest {

    @Positive(message = "{rentACar.constraint.kilometer.positive}")
    private int kilometer;

    @Pattern(regexp = "^(0[1-9]|[1-7][0-9]|8[01])(([A-Z])(\\d{4,5})|([A-Z]{2})(\\d{3,4})|([A-Z]{3})(\\d{2,3}))$", message = "{rentACar.constraint.plate.pattern}")
    private String plate;

    @Min(value = 2005, message = "{rentACar.constraint.year.min}")
    @DecimalMax(value = "2024", message = "{rentACar.constraint.year.max}")
    private int year;

    @DecimalMin(value = "0", message = "{rentACar.constraint.dailyPrice.min}")
    private BigDecimal dailyPrice;

    @Min(value = 1, message = "{rentACar.constraint.modelId.min}")
    private int modelId;

    @Min(value = 1, message = "{rentACar.constraint.colorId.min}")
    private int colorId;

    public void setPlate(String plate) {
        this.plate = plate.replaceAll("\\s", "");
    }

}



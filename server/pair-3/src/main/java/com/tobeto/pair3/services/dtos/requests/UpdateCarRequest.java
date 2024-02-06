package com.tobeto.pair3.services.dtos.requests;

import com.tobeto.pair3.services.dtos.validaton.FileType;
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

    @Positive(message = "{rentACar.constraint.kilometer.positive}")
    private int kilometer;

    @Pattern(regexp = "^(0[1-9]|[1-7][0-9]|8[01])(([A-Z])(\\d{4,5})|([A-Z]{2})(\\d{3,4})|([A-Z]{3})(\\d{2,3}))$", message = "{rentACar.constraint.plate.pattern}")
    private String plate;

    @Min(value = 2005, message = "{rentACar.constraint.year.min}")
    @DecimalMax(value = "2024", message = "{rentACar.constraint.year.max}")
    private int year;

    @DecimalMin(value = "0", message = "{rentACar.constraint.dailyPrice.min}")
    private BigDecimal dailyPrice;

    private String modelName;

    private String colorName;

    private String location;
    private String status;

    @FileType
    private String image;

    public void setPlate(String plate) {
        this.plate = plate.replaceAll("\\s", "");
    }
}

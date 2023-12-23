package com.tobeto.pair3.services.dtos.responses;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.tobeto.pair3.entities.Rental;
import lombok.Data;

import java.time.LocalDate;

@Data
public class GetInvoiceResponse {

    private int id;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate createDate;

    private int rental;

}

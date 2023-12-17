package com.tobeto.pair3.services.dtos.requests;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UpdateInvoiceRequest {
    private int id;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate createDate;

    private int rental;


}

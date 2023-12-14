package com.tobeto.pair3.services.dtos.requests;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UpdateInvoiceRequest {
    private int id;

    private LocalDate createDate;

    private int rental;


}

package com.tobeto.pair3.services.dtos.responses;

import com.tobeto.pair3.entities.Rental;
import lombok.Data;

import java.time.LocalDate;

@Data
public class GetInvoiceResponse {

    private int id;

    private LocalDate createDate;

    private int rental;

}

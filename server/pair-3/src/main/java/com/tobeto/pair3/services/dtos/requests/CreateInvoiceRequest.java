package com.tobeto.pair3.services.dtos.requests;

import com.tobeto.pair3.entities.Rental;
import lombok.Data;

@Data
public class CreateInvoiceRequest {

    private int rentalId;
}

package com.tobeto.pair3.services.dtos.requests;

import com.tobeto.pair3.entities.Rental;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateInvoiceRequest {

    private int rentalId;
}

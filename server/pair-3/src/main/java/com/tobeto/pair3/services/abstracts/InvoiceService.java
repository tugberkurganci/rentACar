package com.tobeto.pair3.services.abstracts;

import com.tobeto.pair3.services.dtos.requests.CreateInvoiceRequest;
import com.tobeto.pair3.services.dtos.requests.CreateRentalRequest;
import com.tobeto.pair3.services.dtos.requests.UpdateInvoiceRequest;
import com.tobeto.pair3.services.dtos.requests.UpdateRentalRequest;
import com.tobeto.pair3.services.dtos.responses.GetInvoiceResponse;
import com.tobeto.pair3.services.dtos.responses.GetRentalResponse;

import java.util.List;

public interface InvoiceService {


    List<GetInvoiceResponse> getAll();

    GetInvoiceResponse getById(int id);

    void add(CreateInvoiceRequest createInvoiceRequest);

    void update(UpdateInvoiceRequest updateInvoiceRequest);

    void delete(int id);


    List<GetInvoiceResponse> getInvoicesByRentalId(int id);
}

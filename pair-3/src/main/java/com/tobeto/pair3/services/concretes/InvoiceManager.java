package com.tobeto.pair3.services.concretes;

import com.tobeto.pair3.core.utils.mapper.ModelMapperService;
import com.tobeto.pair3.entities.Color;
import com.tobeto.pair3.entities.Invoice;
import com.tobeto.pair3.repositories.CarRepository;
import com.tobeto.pair3.repositories.InvoiceRepository;
import com.tobeto.pair3.services.abstracts.InvoiceService;
import com.tobeto.pair3.services.dtos.requests.CreateColorRequest;
import com.tobeto.pair3.services.dtos.requests.CreateInvoiceRequest;
import com.tobeto.pair3.services.dtos.requests.UpdateColorRequest;
import com.tobeto.pair3.services.dtos.requests.UpdateInvoiceRequest;
import com.tobeto.pair3.services.dtos.responses.GetAllColorResponse;
import com.tobeto.pair3.services.dtos.responses.GetColorResponse;
import com.tobeto.pair3.services.dtos.responses.GetInvoiceResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor
public class InvoiceManager implements InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final ModelMapperService mapperService;



    @Override
    public void update(UpdateInvoiceRequest updateInvoiceRequest) {
       Invoice invoice= mapperService.forRequest().map(updateInvoiceRequest, Invoice.class);
        invoiceRepository.save(invoice);
    }

    @Override
    public void add(CreateInvoiceRequest createInvoiceRequest) {
        Invoice invoice = mapperService.forRequest().map(createInvoiceRequest, Invoice.class);
        invoice.setCreateDate(LocalDate.now());
        invoiceRepository.save(invoice);

    }

    @Override
    public List<GetInvoiceResponse> getAll() {
        List<Invoice> invoiceList = invoiceRepository.findAll();

        List<GetInvoiceResponse> responseList = invoiceList.stream().map(
                invoice-> mapperService.forResponse().map(invoice,GetInvoiceResponse.class)
        ).toList();
        return responseList;
    }

    @Override
    public GetInvoiceResponse getById(int id) {
        Invoice invoice = invoiceRepository.findById(id).orElseThrow();
        GetInvoiceResponse response = mapperService.forResponse().map(invoice,GetInvoiceResponse.class);
        return response;
    }

    @Override
    public void delete(int id) {
        Invoice invoice = invoiceRepository.findById(id).orElseThrow();
        invoiceRepository.delete(invoice);
    }
}

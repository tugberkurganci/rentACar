package com.tobeto.pair3.controllers;

import com.tobeto.pair3.services.abstracts.InvoiceService;
import com.tobeto.pair3.services.dtos.requests.CreateBrandRequest;
import com.tobeto.pair3.services.dtos.requests.CreateInvoiceRequest;
import com.tobeto.pair3.services.dtos.requests.UpdateBrandRequest;
import com.tobeto.pair3.services.dtos.requests.UpdateInvoiceRequest;
import com.tobeto.pair3.services.dtos.responses.GetAllBrandResponse;
import com.tobeto.pair3.services.dtos.responses.GetBrandResponse;
import com.tobeto.pair3.services.dtos.responses.GetInvoiceResponse;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/v1/invoices")
public class InvoiceController {
    private final InvoiceService invoiceService;


    @PostMapping
    public void add (@RequestBody CreateInvoiceRequest createInvoiceRequest ){
        invoiceService.add(createInvoiceRequest);
    }
    @PutMapping("{id}")
    public void update (@RequestBody UpdateInvoiceRequest updateInvoiceRequest ){
        invoiceService.update(updateInvoiceRequest);
    }
    @DeleteMapping("{id}")
    public void delete (@PathVariable Integer id ){
        invoiceService.delete(id);
    }
    @GetMapping
    public List<GetInvoiceResponse> getAll(){

        return invoiceService.getAll();
    }
    @GetMapping("{id}")
    public GetInvoiceResponse getById(@PathVariable  Integer id){
        return invoiceService.getById(id);
    }
}



























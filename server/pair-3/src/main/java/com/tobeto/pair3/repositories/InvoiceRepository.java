package com.tobeto.pair3.repositories;

import com.tobeto.pair3.entities.Invoice;
import com.tobeto.pair3.services.dtos.responses.GetInvoiceResponse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InvoiceRepository extends JpaRepository<Invoice,Integer> {
    List<Invoice> findByRentalId(int id);
}

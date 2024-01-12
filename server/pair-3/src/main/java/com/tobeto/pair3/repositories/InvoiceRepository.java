package com.tobeto.pair3.repositories;

import com.tobeto.pair3.entities.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoiceRepository extends JpaRepository<Invoice,Integer> {
}

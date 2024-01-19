package com.tobeto.pair3.repositories;

import com.tobeto.pair3.entities.Rental;
import com.tobeto.pair3.services.dtos.responses.GetRentalResponse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RentalRepository extends JpaRepository<Rental,Integer> {
    List<Rental> findByUserId(int id);
}

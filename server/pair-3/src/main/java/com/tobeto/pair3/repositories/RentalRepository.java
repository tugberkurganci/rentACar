package com.tobeto.pair3.repositories;

import com.tobeto.pair3.entities.Rental;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RentalRepository extends JpaRepository<Rental,Integer> {
}

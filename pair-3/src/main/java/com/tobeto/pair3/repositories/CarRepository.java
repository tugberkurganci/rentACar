package com.tobeto.pair3.repositories;

import com.tobeto.pair3.entities.Car;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarRepository extends JpaRepository<Car,Integer> {
}

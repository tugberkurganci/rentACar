package com.tobeto.pair3.repositories;

import com.tobeto.pair3.entities.Location;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepository extends JpaRepository<Location,Integer> {
    Location findByName(String pickUpLocation);
}

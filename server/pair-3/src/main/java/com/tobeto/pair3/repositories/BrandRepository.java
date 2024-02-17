package com.tobeto.pair3.repositories;

import com.tobeto.pair3.entities.Brand;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BrandRepository extends JpaRepository<Brand,Integer> {
    boolean existsByName(String name);

    Brand findByName(String brandName);
}

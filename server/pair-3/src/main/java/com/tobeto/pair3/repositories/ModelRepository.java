package com.tobeto.pair3.repositories;

import com.tobeto.pair3.entities.Model;
import com.tobeto.pair3.services.dtos.requests.GetBrandNameRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ModelRepository extends JpaRepository<Model,Integer> {

    boolean existsByName(String name);

    Model findByName(String modelName);
}

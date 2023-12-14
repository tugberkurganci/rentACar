package com.tobeto.pair3.repositories;

import com.tobeto.pair3.entities.Color;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ColorRepository extends JpaRepository<Color,Integer> {
    boolean existsById(@NonNull Integer id);
}

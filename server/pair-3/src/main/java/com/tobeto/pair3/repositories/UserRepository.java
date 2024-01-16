package com.tobeto.pair3.repositories;

import com.tobeto.pair3.entities.User;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Integer> {
    boolean existsByEmail(String mail);

    User findByEmail(String email);
}

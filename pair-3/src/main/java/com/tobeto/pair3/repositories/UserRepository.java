package com.tobeto.pair3.repositories;

import com.tobeto.pair3.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Integer> {
}

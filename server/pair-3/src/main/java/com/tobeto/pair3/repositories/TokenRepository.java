package com.tobeto.pair3.repositories;

import com.tobeto.pair3.entities.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface TokenRepository extends JpaRepository<Token,String> {
    Token findByUserId(int userId);

    @Transactional
    void deleteByUserId(int id);
}

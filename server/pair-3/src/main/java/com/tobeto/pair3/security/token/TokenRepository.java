package com.tobeto.pair3.security.token;


import com.tobeto.pair3.security.token.Token;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TokenRepository extends JpaRepository<Token, String> {




}

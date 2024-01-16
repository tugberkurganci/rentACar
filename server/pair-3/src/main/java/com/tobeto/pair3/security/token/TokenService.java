package com.tobeto.pair3.security.token;

import com.tobeto.pair3.entities.User;
import com.tobeto.pair3.security.dtos.Credentials;

public interface TokenService {

     Token CreateToken(User user, Credentials credentials);

     User verifyToken(String authorizationHeader);

    void logout(String authHeader);
}

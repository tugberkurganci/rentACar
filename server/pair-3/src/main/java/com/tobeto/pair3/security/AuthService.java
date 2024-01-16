package com.tobeto.pair3.security;

import com.tobeto.pair3.core.exception.AuthenticationException;
import com.tobeto.pair3.entities.User;
import com.tobeto.pair3.security.dtos.AuthResponse;
import com.tobeto.pair3.security.dtos.Credentials;
import com.tobeto.pair3.security.dtos.UserResponse;
import com.tobeto.pair3.security.token.Token;
import com.tobeto.pair3.security.token.TokenService;
import com.tobeto.pair3.services.abstracts.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private UserService userService;


    private TokenService tokenService;

    private PasswordEncoder passwordEncoder ;

    public AuthService(UserService userService, TokenService tokenService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.tokenService = tokenService;
        this.passwordEncoder = passwordEncoder;
    }


    public AuthResponse authenticate(Credentials credentials) {

        User user = userService.findByEmail(credentials.email());

        if (user == null) {

            throw new AuthenticationException();
        }

        if (!passwordEncoder.matches(credentials.password(), user.getPassword())) {
            throw new AuthenticationException();
        }

        Token token=tokenService.CreateToken(user,credentials);

        return new AuthResponse(new UserResponse(user),token);


    }


    public void logout(String authHeader) {
        tokenService.logout(authHeader);
    }
}

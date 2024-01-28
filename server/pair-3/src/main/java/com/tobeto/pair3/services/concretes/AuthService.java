package com.tobeto.pair3.services.concretes;

import com.tobeto.pair3.core.exception.AuthenticationException;
import com.tobeto.pair3.entities.User;
import com.tobeto.pair3.services.dtos.responses.AuthResponse;
import com.tobeto.pair3.services.dtos.requests.Credentials;
import com.tobeto.pair3.services.dtos.requests.UserResponse;
import com.tobeto.pair3.services.concretes.JwtTokenService;
import com.tobeto.pair3.entities.Token;
import com.tobeto.pair3.services.abstracts.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private UserService userService;


    private JwtTokenService jwtService;

    private PasswordEncoder passwordEncoder ;

    public AuthService(UserService userService, JwtTokenService tokenService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.jwtService = tokenService;
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

        jwtService.deleteToken(user.getId());
        Token token=jwtService.CreateToken(user,true);


        return new AuthResponse(new UserResponse(user),token);


    }



}

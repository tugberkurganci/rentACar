package com.tobeto.pair3.services.dtos.responses;

import com.tobeto.pair3.entities.Token;
import com.tobeto.pair3.services.dtos.requests.UserResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class AuthResponse {


    private UserResponse user;

    private Token token;

}

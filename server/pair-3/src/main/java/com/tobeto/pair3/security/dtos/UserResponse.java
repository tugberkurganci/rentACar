package com.tobeto.pair3.security.dtos;

import com.tobeto.pair3.entities.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {

    private int id;
    private String image;
    private String name;
    private String email;
    private String phone;
    private String address;


    public UserResponse(User user) {
        this.id=user.getId();
        this.name = user.getName();
        this.email = user.getEmail();

    }
}
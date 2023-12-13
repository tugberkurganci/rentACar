package com.tobeto.pair3.services.dtos.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
public class CreateUserRequest {
    private String name;
    private String surname;
    private String email;
    private LocalDate birthDate;
}

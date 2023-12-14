package com.tobeto.pair3.services.dtos.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetAllUsersResponse {
    private Integer id;
    private String name;
    private String surname;
    private String email;
    private LocalDate birthDate;
}

package com.tobeto.pair3.services.dtos.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserRequest {
    private Integer id;
    private String name;
    private String surname;
}

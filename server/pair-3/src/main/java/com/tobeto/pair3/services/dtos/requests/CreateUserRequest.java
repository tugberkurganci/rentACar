package com.tobeto.pair3.services.dtos.requests;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
public class CreateUserRequest {
    @NotBlank(message = "{rentACar.constraint.name.notblank}")
    private String name;

    @NotBlank(message = "{rentACar.constraint.surname.notblank}")
    private String surname;

    @NotBlank(message = "{rentACar.constraint.email.notblank}")
    @Email(message = "{rentACar.constraint.email.invalidformat}")
    private String email;

    @NotBlank(message = "{rentACar.constraint.password.notblank}")
    @Size(min = 6, message = "{rentACar.constraint.password.size}")
    private String password;

    @NotNull(message = "{rentACar.constraint.birthdate.notnull}")
    @Past(message = "{rentACar.constraint.birthdate.past}")
    private LocalDate birthDate;
}

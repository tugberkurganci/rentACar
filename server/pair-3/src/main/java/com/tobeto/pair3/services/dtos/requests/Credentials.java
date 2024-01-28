package com.tobeto.pair3.services.dtos.requests;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record Credentials(
        @Email(message = "{rentACar.constraint.email.invalidformat}") String email,
        @NotBlank(message = "{rentACar.constraint.password.notblank}") String password
) {
}
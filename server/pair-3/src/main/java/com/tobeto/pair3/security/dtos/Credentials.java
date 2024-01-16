package com.tobeto.pair3.security.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record Credentials(
        @Email(message = "Geçersiz e-posta adresi") String email,
        @NotBlank(message = "Parola boş olamaz") String password
) {
}
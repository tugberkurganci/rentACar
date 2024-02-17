package com.tobeto.pair3.services.dtos.validaton;


import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Constraint(validatedBy = FileTypeValidator.class)
@Target({ ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface FileType {

    String message() default "Only jpeg and png type are allowed";

    Class<?>[] groups() default { };

    Class<? extends Payload>[] payload() default { };



}
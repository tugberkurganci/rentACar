package com.tobeto.pair3.services.dtos.validaton;

import java.util.Arrays;
import java.util.stream.Collectors;

import com.tobeto.pair3.services.concretes.FileService;
import org.hibernate.validator.constraintvalidation.HibernateConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;


import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class FileTypeValidator implements ConstraintValidator<FileType, String> {

    @Autowired
    FileService fileService;



    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if(value ==null || value.isEmpty())return  true;
        String type=fileService.detectType(value);
        if(type.equals("image/jpeg") || type.equals("image/png")) return true;
        return false;
    }

}
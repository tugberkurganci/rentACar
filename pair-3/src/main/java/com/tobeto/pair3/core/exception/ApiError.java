package com.tobeto.pair3.core.exception;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.Map;

@Data
@JsonInclude(value = JsonInclude.Include.NON_NULL)
public class ApiError {

    private int status;
    private String message;
    private String path;
    @JsonIgnore
    long timestamp = new Date().getTime();

    LocalDateTime localDateTime = LocalDateTime.ofInstant(Instant.ofEpochMilli(timestamp), ZoneId.systemDefault());

    private Map<String,String> validationErrors=null;

    public void addValidationError(String field, String message) {
        validationErrors.put(field, message);
    }
}
package com.tobeto.pair3.core.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;

@RestControllerAdvice
public class GlobalHandlerException {

    private HttpServletRequest request;

    public GlobalHandlerException(HttpServletRequest request) {
        this.request = request;
    }


    @ExceptionHandler({MethodArgumentNotValidException.class,BusinessException.class, RuntimeException.class, Exception.class})
    public ResponseEntity<ApiError> handleException(Exception ex) {

        ApiError apiError = new ApiError();
        apiError.setStatus(HttpStatus.BAD_REQUEST.value());
        apiError.setPath(request.getRequestURI());
        apiError.setMessage(ex.getMessage());

        if (ex instanceof MethodArgumentNotValidException) {


            apiError.setValidationErrors(new HashMap<>());

            //validation errors
            for (FieldError fieldError : ((MethodArgumentNotValidException) ex).getBindingResult().getFieldErrors()) {
                apiError.addValidationError(fieldError.getField(), fieldError.getDefaultMessage());
            }
        } else if (ex instanceof BusinessException) {
            // Business exception handling

            apiError.setStatus(400);

        }else if (ex instanceof NotUniqueEmailException) {
            apiError.setMessage(ex.getMessage());
            apiError.setValidationErrors(((NotUniqueEmailException) ex).getValidationErros());


        }

        return ResponseEntity.status(apiError.getStatus()).body(apiError);
    }
}
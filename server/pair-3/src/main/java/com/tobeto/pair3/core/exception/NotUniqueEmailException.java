package com.tobeto.pair3.core.exception;

import com.tobeto.pair3.core.messages.Messages;
import org.springframework.context.i18n.LocaleContextHolder;

import java.util.Collections;
import java.util.Map;

public class NotUniqueEmailException extends RuntimeException {
    public NotUniqueEmailException() {
        super(Messages.getMessageForLocale("rentACar.constraint.email.notunique", LocaleContextHolder.getLocale()));

    }

    public Map<String,String> getValidationErros(){
        return Collections.singletonMap("email",Messages.getMessageForLocale("rentACar.constraint.email.notunique", LocaleContextHolder.getLocale()));
    }

}

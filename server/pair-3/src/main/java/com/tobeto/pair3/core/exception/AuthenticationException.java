package com.tobeto.pair3.core.exception;

import com.tobeto.pair3.core.messages.Messages;
import org.springframework.context.i18n.LocaleContextHolder;

public class AuthenticationException extends RuntimeException {
    public AuthenticationException() {
        super(Messages.getMessageForLocale("rentACar.auth.invalid.credentials", LocaleContextHolder.getLocale()));
    }
}


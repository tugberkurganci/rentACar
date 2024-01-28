package com.tobeto.pair3.services.businessrules;

import com.tobeto.pair3.core.exception.BusinessException;
import com.tobeto.pair3.core.messages.Messages;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Service
public class RentalRules {

    public void checkIsDateBeforeNow(LocalDate date) {
        if(date.isBefore(LocalDate.now())){
            throw new BusinessException(Messages.getMessageForLocale("rentACar.exception.start.date.past", LocaleContextHolder.getLocale()));
        }
    }

    public void checkEndDateIsBeforeStartDate(LocalDate endDate, LocalDate startDate) {

        if (endDate.isBefore(startDate)) {
            throw new BusinessException(Messages.getMessageForLocale("rentACar.exception.end.date.before.start", LocaleContextHolder.getLocale()));
        }
    }

    public void checkIsRentalDateLongerThan25Days(LocalDate startDate, LocalDate endDate) {
        if( ChronoUnit.DAYS.between(startDate,endDate)>25){

            throw new BusinessException(Messages.getMessageForLocale("rentACar.exception.rental.date.longer.than.25days", LocaleContextHolder.getLocale()));

        }

    }
}

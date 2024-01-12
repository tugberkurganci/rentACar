package com.tobeto.pair3.services.businessrules;

import com.tobeto.pair3.core.exception.BusinessException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Service
public class RentalRules {

    public void checkIsDateBeforeNow(LocalDate date) {
        if(date.isBefore(LocalDate.now())){
            throw new BusinessException("Start date cannot be in the past");
        }
    }

    public void checkEndDateIsBeforeStartDate(LocalDate endDate, LocalDate startDate) {

        if (endDate.isBefore(startDate)) {
            throw new BusinessException("End date cannot be before the start date");
        }
    }

    public void checkIsRentalDateLongerThan25Days(LocalDate startDate, LocalDate endDate) {
        if( ChronoUnit.DAYS.between(startDate,endDate)>25){

            throw new RuntimeException("its no longer than 25 days");

        }

    }
}

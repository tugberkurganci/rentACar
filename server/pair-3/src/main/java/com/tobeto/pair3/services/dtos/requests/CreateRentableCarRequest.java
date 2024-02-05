package com.tobeto.pair3.services.dtos.requests;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateRentableCarRequest {


    @NotNull(message = "{rentACar.constraint.start.date.notnull}")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;

    @NotNull(message = "{rentACar.constraint.end.date.notnull}")
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Future(message = "{rentACar.constraint.end.date.future}")
    private LocalDate endDate;

    private String pickUpLocation;

    private String dropOffLocation;

    public CreateRentableCarRequest(CreateRentalRequest createRentalRequest) {
        this.startDate = createRentalRequest.getStartDate();
        this.endDate = createRentalRequest.getEndDate();
        this.pickUpLocation = pickUpLocation;
        this.dropOffLocation = dropOffLocation;
    }
}

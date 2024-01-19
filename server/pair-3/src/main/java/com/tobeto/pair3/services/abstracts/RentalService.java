package com.tobeto.pair3.services.abstracts;

import com.tobeto.pair3.services.dtos.requests.CreateRentalRequest;
import com.tobeto.pair3.services.dtos.requests.UpdateRentalRequest;
import com.tobeto.pair3.services.dtos.responses.GetRentalResponse;

import java.math.BigDecimal;
import java.util.List;

public interface RentalService {
    List<GetRentalResponse> getAll();

    GetRentalResponse getById(int id);

    GetRentalResponse add(CreateRentalRequest createRentalRequest);

    void update(UpdateRentalRequest updateRentalRequest);

    void delete(int id);

    BigDecimal getPrice(CreateRentalRequest createRentalRequest);

    List<GetRentalResponse> getRentalsByUserId(int id);
}

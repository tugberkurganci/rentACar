package com.tobeto.pair3.services.abstracts;

import com.tobeto.pair3.entities.Location;
import com.tobeto.pair3.services.dtos.requests.CreateLocationRequest;
import com.tobeto.pair3.services.dtos.responses.GetLocationResponse;

import java.util.List;

public interface LocationService {
     void add(CreateLocationRequest request);

     List<GetLocationResponse> getAll() ;

     Location findByName(String pickUpLocation);
}

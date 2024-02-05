package com.tobeto.pair3.services.concretes;

import com.tobeto.pair3.entities.Location;
import com.tobeto.pair3.repositories.LocationRepository;
import com.tobeto.pair3.services.abstracts.LocationService;
import com.tobeto.pair3.services.dtos.requests.CreateLocationRequest;
import com.tobeto.pair3.services.dtos.responses.GetLocationResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class LocationManager implements LocationService {

    private LocationRepository locationRepository;

    @Override
    public void add(CreateLocationRequest request) {

        Location location=new Location();
        location.setName(request.getName());
        locationRepository.save(location);

    }

    @Override
    public List<GetLocationResponse> getAll() {
        return locationRepository.findAll().stream().map(location -> new GetLocationResponse(location.getId(),location.getName())).toList();
    }

    @Override
    public Location findByName(String pickUpLocation) {
        return  locationRepository.findByName(pickUpLocation);
    }
}

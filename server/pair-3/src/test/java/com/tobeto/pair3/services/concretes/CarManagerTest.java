package com.tobeto.pair3.services.concretes;

import com.tobeto.pair3.entities.Car;
import com.tobeto.pair3.entities.Rental;
import com.tobeto.pair3.services.dtos.requests.CreateRentableCarRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;

class CarManagerTest {

    @Autowired
    CarManager carManager;

    @Test
    void getRentableCars() {

        Car car = new Car();
        // Assuming you have a method to add rentals to a car
        car.setRentals(new ArrayList<>());
        car.addRental(new Rental(LocalDate.parse("2024-01-01"), LocalDate.parse("2024-01-10")));
        car.addRental(new Rental(LocalDate.parse("2024-02-01"), LocalDate.parse("2024-02-10")));

        // Create a request that overlaps with an existing rental
        CreateRentableCarRequest overlappingRequest = new CreateRentableCarRequest(
                LocalDate.parse("2024-01-05"),
                LocalDate.parse("2024-01-15")
        );

        // Test the isReservable method
        boolean result = carManager.isReservable(car, overlappingRequest);

        // Assert that the result is false because there is an overlap
        assertFalse(result, "The car should not be reservable for overlapping dates");
    }
}
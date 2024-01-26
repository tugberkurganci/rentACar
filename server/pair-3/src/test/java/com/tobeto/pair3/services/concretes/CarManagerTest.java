package com.tobeto.pair3.services.concretes;

import com.tobeto.pair3.entities.Car;
import com.tobeto.pair3.entities.Rental;
import com.tobeto.pair3.services.dtos.requests.CreateRentableCarRequest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;
@ExtendWith(MockitoExtension.class)
class CarManagerTest {

    @InjectMocks
    CarManager carManager;

    @Test
    void getRentableCars() {

        Car car = new Car();
        // Assuming you have a method to add rentals to a car
        car.setRentals(new ArrayList<>());
        car.addRental(new Rental(LocalDate.parse("2024-01-28"), LocalDate.parse("2024-01-30")));


        // Create a request that overlaps with an existing rental
        CreateRentableCarRequest overlappingRequest = new CreateRentableCarRequest(
                LocalDate.parse("2024-01-23"),
                LocalDate.parse("2024-01-27")
        );

        // Test the isReservable method
        boolean result = carManager.isReservable(car, overlappingRequest);

        // Assert that the result is false because there is an overlap
        assertTrue(result, "The car should not be reservable for overlapping dates");
    }
    @Test
    void getRentableCarsv2() {

        Car car = new Car();
        // Assuming you have a method to add rentals to a car
        car.setRentals(new ArrayList<>());
        car.addRental(new Rental(LocalDate.parse("2024-01-23"), LocalDate.parse("2024-01-26")));


        // Create a request that overlaps with an existing rental
        CreateRentableCarRequest overlappingRequest = new CreateRentableCarRequest(
                LocalDate.parse("2024-01-27"),
                LocalDate.parse("2024-01-28")
        );

        // Test the isReservable method
        boolean result = carManager.isReservable(car, overlappingRequest);

        // Assert that the result is false because there is an overlap
        assertTrue(result, "The car should not be reservable for overlapping dates");
    }











    @Test
    void testReservableForOverlappingDates() {
        Car car = new Car();
        car.setRentals(new ArrayList<>());
        car.addRental(new Rental(LocalDate.parse("2024-01-01"), LocalDate.parse("2024-01-10")));
        car.addRental(new Rental(LocalDate.parse("2024-02-01"), LocalDate.parse("2024-02-10")));

        CreateRentableCarRequest overlappingRequest = new CreateRentableCarRequest(
                LocalDate.parse("2023-01-01"),
                LocalDate.parse("2024-03-15")
        );

        boolean result = carManager.isReservable(car, overlappingRequest);

        assertFalse(result, "The car should not be reservable for overlapping dates");
    }

    @Test
    void testReservableForNonOverlappingDates() {
        Car car = new Car();
        car.setRentals(new ArrayList<>());
        car.addRental(new Rental(LocalDate.parse("2024-01-01"), LocalDate.parse("2024-01-10")));
        car.addRental(new Rental(LocalDate.parse("2024-02-01"), LocalDate.parse("2024-02-10")));

        CreateRentableCarRequest nonOverlappingRequest = new CreateRentableCarRequest(
                LocalDate.parse("2024-03-01"),
                LocalDate.parse("2024-03-10")
        );

        boolean result = carManager.isReservable(car, nonOverlappingRequest);

        assertTrue(result, "The car should be reservable for non-overlapping dates");
    }

    @Test
    void testReservableForEmptyRentals() {
        Car car = new Car();
        car.setRentals(new ArrayList<>());

        CreateRentableCarRequest request = new CreateRentableCarRequest(
                LocalDate.parse("2024-01-01"),
                LocalDate.parse("2024-01-10")
        );

        boolean result = carManager.isReservable(car, request);

        assertTrue(result, "The car should be reservable when there are no existing rentals");
    }
}
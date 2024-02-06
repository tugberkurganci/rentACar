package com.tobeto.pair3.repositories;

import com.tobeto.pair3.entities.Car;
import com.tobeto.pair3.entities.CarStatus;
import com.tobeto.pair3.services.dtos.responses.GetAllUsersResponse;
import com.tobeto.pair3.services.dtos.responses.GetCarResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CarRepository extends JpaRepository<Car,Integer> {
    boolean existsByPlate(String plate);

    @Query("SELECT DISTINCT new com.tobeto.pair3.services.dtos.responses.GetCarResponse(c.id, c.kilometer, c.plate, c.year, c.dailyPrice, c.model.name,c.color.name,c.image) " +
            "FROM Car c WHERE "+
            "c.plate LIKE %:searchKey% OR " +
            "c.model.name LIKE %:searchKey% OR " +
            "c.color.name LIKE %:searchKey%")
    Page<GetCarResponse> searchKeyAndGetUser(String searchKey, Pageable pageable);

    List<Car> findByStatus(CarStatus available);
}

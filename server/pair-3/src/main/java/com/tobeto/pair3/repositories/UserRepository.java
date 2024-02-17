package com.tobeto.pair3.repositories;

import com.tobeto.pair3.entities.User;
import com.tobeto.pair3.services.dtos.responses.GetAllUsersResponse;
import lombok.NonNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User,Integer> {
    boolean existsByEmail(String mail);

    User findByEmail(String email);

    @Query("SELECT DISTINCT new com.tobeto.pair3.services.dtos.responses.GetAllUsersResponse(u.id, u.name, u.surname, u.email, u.birthDate, u.image) FROM User u WHERE u.name LIKE %:searchKey% OR " +
            "u.surname LIKE %:searchKey% OR u.name LIKE %:searchKey% " +
            "OR u.email LIKE %:searchKey% " )
    Page<GetAllUsersResponse> searchKeyAndGetUser(@Param("searchKey") String searchKey, Pageable pageable);

}

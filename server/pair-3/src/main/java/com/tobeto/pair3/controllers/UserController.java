package com.tobeto.pair3.controllers;

import com.tobeto.pair3.services.abstracts.UserService;
import com.tobeto.pair3.services.dtos.requests.CreateUserRequest;
import com.tobeto.pair3.services.dtos.requests.UpdateCarRequest;
import com.tobeto.pair3.services.dtos.requests.UpdateUserRequest;
import com.tobeto.pair3.services.dtos.responses.GetAllUsersResponse;
import com.tobeto.pair3.services.dtos.responses.GetUserResponse;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/users")
public class UserController {
    private final UserService userService;


    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping()
    public void add(@RequestBody @Valid CreateUserRequest createUserRequest){
        userService.add(createUserRequest);
    }
    @PutMapping()
    public void update(@RequestBody @Valid UpdateUserRequest updateUserRequest){
        userService.update(updateUserRequest);
    }
    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") int id){
        userService.delete(id);
    }
    @GetMapping
    public List<GetAllUsersResponse> getAll(){
        return userService.getAll();
    }
    @GetMapping("{id}")
    public GetUserResponse getById(@PathVariable("id") int id){
        return userService.getById(id);
    }

    @GetMapping("/via-page")
    public Page<GetAllUsersResponse> getAllViaPage(Pageable pageable){
        return userService.getAllViaPage(pageable);
    }
}



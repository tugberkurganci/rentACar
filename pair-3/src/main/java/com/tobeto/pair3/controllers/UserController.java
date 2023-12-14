package com.tobeto.pair3.controllers;

import com.tobeto.pair3.services.abstracts.UserService;
import com.tobeto.pair3.services.dtos.requests.CreateUserRequest;
import com.tobeto.pair3.services.dtos.requests.UpdateCarRequest;
import com.tobeto.pair3.services.dtos.requests.UpdateUserRequest;
import com.tobeto.pair3.services.dtos.responses.GetAllUsersResponse;
import com.tobeto.pair3.services.dtos.responses.GetUserResponse;
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
    public void add(@RequestBody CreateUserRequest createUserRequest){
        userService.add(createUserRequest);
    }
    @PutMapping("{id}")
    public void update(@RequestBody UpdateUserRequest updateUserRequest){
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
}



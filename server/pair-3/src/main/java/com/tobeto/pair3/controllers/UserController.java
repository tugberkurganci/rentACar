package com.tobeto.pair3.controllers;

import com.tobeto.pair3.services.abstracts.UserService;
import com.tobeto.pair3.services.dtos.requests.CreateUserRequest;
import com.tobeto.pair3.services.dtos.requests.GenericMessage;
import com.tobeto.pair3.services.dtos.requests.UpdateUserRequest;
import com.tobeto.pair3.services.dtos.responses.GetAllUsersResponse;
import com.tobeto.pair3.services.dtos.responses.GetUserResponse;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<GenericMessage> delete(@PathVariable("id") int id){
        userService.delete(id);
        var cookie= ResponseCookie.from("car-token","").path("/").maxAge(0).httpOnly(true).build();

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,cookie.toString()).body(new GenericMessage("logout success"));
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

    @GetMapping("/search-user")
    public Page<GetAllUsersResponse> searchKeyAndGetUser(@RequestParam("searchKey") String searchKey,Pageable pageable){
        return userService.searchKeyAndGetUser(searchKey,pageable);
    }
}



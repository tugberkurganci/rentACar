package com.tobeto.pair3.services.concretes;

import com.tobeto.pair3.core.utils.mapper.ModelMapperService;
import com.tobeto.pair3.entities.User;
import com.tobeto.pair3.repositories.UserRepository;
import com.tobeto.pair3.services.abstracts.UserService;
import com.tobeto.pair3.services.dtos.requests.CreateUserRequest;
import com.tobeto.pair3.services.dtos.requests.UpdateCarRequest;
import com.tobeto.pair3.services.dtos.requests.UpdateUserRequest;
import com.tobeto.pair3.services.dtos.responses.GetAllUsersResponse;
import com.tobeto.pair3.services.dtos.responses.GetUserResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@AllArgsConstructor
@Service
public class UserManager implements UserService {
    private final UserRepository userRepository;
    private final ModelMapperService mapperService;
    @Override
    public void add(CreateUserRequest createUserRequest) {
        User user = mapperService.forRequest().map(createUserRequest, User.class);
        userRepository.save(user);
    }

    @Override
    public void update(UpdateUserRequest updateUserRequest) {
        User user = mapperService.forRequest().map(updateUserRequest, User.class);
        userRepository.save(user);
    }

    @Override
    public void delete(Integer id) {
        User user = userRepository.findById(id).orElseThrow();
        userRepository.delete(user);

    }

    @Override
    public List<GetAllUsersResponse> getAll() {
        List<User> userList = userRepository.findAll();
        List<GetAllUsersResponse> responseList = userList
                .stream()
                .map(user -> mapperService.forResponse().map(user, GetAllUsersResponse.class))
                .toList();
        return responseList;
    }

    @Override
    public GetUserResponse getById(int id) {
        User user = userRepository.findById(id).orElseThrow();
        GetUserResponse response = mapperService.forResponse().map(user, GetUserResponse.class);
        return response;
    }
}

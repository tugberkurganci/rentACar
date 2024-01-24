package com.tobeto.pair3.services.concretes;

import com.tobeto.pair3.core.exception.BusinessException;
import com.tobeto.pair3.core.utils.mapper.ModelMapperService;
import com.tobeto.pair3.entities.Role;
import com.tobeto.pair3.entities.User;
import com.tobeto.pair3.repositories.UserRepository;
import com.tobeto.pair3.services.abstracts.UserService;
import com.tobeto.pair3.services.dtos.requests.CreateUserRequest;
import com.tobeto.pair3.services.dtos.requests.UpdateUserRequest;
import com.tobeto.pair3.services.dtos.responses.GetAllUsersResponse;
import com.tobeto.pair3.services.dtos.responses.GetUserResponse;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class UserManager implements UserService {
    private final UserRepository userRepository;
    private final ModelMapperService mapperService;
    private PasswordEncoder passwordEncoder ;



    @Override
    public void add(CreateUserRequest createUserRequest) {
        if (userRepository.existsByEmail(createUserRequest.getEmail())) {
            throw new RuntimeException("Email mevcut");
        }
        User user = mapperService.forRequest().map(createUserRequest, User.class);
        user.setPassword(passwordEncoder.encode(createUserRequest.getPassword()));
        user.setRole(Role.USER);
        userRepository.save(user);
    }

    @Override
    public void update(UpdateUserRequest updateUserRequest) {
        User user = userRepository.findById(updateUserRequest.getId()).orElseThrow();


        if (userRepository.existsByEmail(updateUserRequest.getEmail())&& updateUserRequest.getEmail() != null) {
                User updatedUser=userRepository.findByEmail(updateUserRequest.getEmail());
                if(user.getId()!=updatedUser.getId()){
                throw new RuntimeException("Email mevcut");}
        }
        if(updateUserRequest.getPassword()!=null){
            User user1 = User
                    .builder()
                    .id(updateUserRequest.getId())
                    .name(updateUserRequest.getName())
                    .surname(updateUserRequest.getSurname())
                    .birthDate(updateUserRequest.getBirthDate())
                    .email(updateUserRequest.getEmail())
                    .role(user.getRole())
                    .rentals(user.getRentals())
                    .password(passwordEncoder.encode(updateUserRequest.getPassword()))
                    .build();
            userRepository.save(user1);
        }else {
            User user1 = User
                    .builder()
                    .id(updateUserRequest.getId())
                    .name(updateUserRequest.getName())
                    .surname(updateUserRequest.getSurname())
                    .birthDate(updateUserRequest.getBirthDate())
                    .email(updateUserRequest.getEmail())
                    .role(user.getRole())
                    .rentals(user.getRentals())
                    .password(user.getPassword())
                    .build();
            userRepository.save(user1);
        }


        /*userRepository.save(user);*/
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

    @Override
    public boolean existsById(int userId) {
        return userRepository.existsById(userId);
    }

    @Override
    public User getOriginalUserById(int userId) {
        return userRepository.findById(userId).orElseThrow();
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public Page<GetAllUsersResponse> getAllViaPage(Pageable pageable) {
        return userRepository.findAll(pageable).map(user -> mapperService.forResponse().map(user, GetAllUsersResponse.class));
    }


}

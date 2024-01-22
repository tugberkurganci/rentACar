package com.tobeto.pair3.security;


import com.tobeto.pair3.security.dtos.AuthResponse;
import com.tobeto.pair3.security.dtos.Credentials;
import com.tobeto.pair3.security.dtos.GenericMessage;
import com.tobeto.pair3.security.token.JwtTokenService;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {


    private AuthService authService;
    private JwtTokenService tokenService;

    public AuthController(AuthService authService, JwtTokenService tokenService) {
        this.authService = authService;
        this.tokenService = tokenService;
    }


    @PostMapping
    ResponseEntity<AuthResponse> handleAuthentication(@RequestBody @Valid Credentials credentials){
        var authResponse=authService.authenticate(credentials);
        var cookie= ResponseCookie.from("car-token",authResponse.getToken().getRefreshToken()).path("/").httpOnly(true).build();

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,cookie.toString()).body(authResponse);
    }

    @PostMapping("refresh")
    ResponseEntity<String> refreshToken(@RequestBody @Valid RefreshTokenRequest request){
        var token=tokenService.createRefeshToken(request);
        if (token==null){var cookie=ResponseCookie.from("car-token","").path("/").maxAge(0).httpOnly(true).build();

            return ResponseEntity.status(409).header(HttpHeaders.SET_COOKIE,cookie.toString()).body("logout success");}
        var cookie= ResponseCookie.from("car-token",token.getRefreshToken()).path("/").httpOnly(true).build();

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,cookie.toString()).body(token.getRefreshToken());
    }


    @PostMapping("/logout")
    ResponseEntity<GenericMessage> handleLogout(@RequestHeader(name = "Authorization",required = false)String authHeader, @CookieValue(value = "car-token",required = false) String cookies ){

        var tokenWithPrefix=authHeader;
        if (cookies!=null)tokenWithPrefix="Any-Prefix "+cookies;

        var cookie=ResponseCookie.from("car-token","").path("/").maxAge(0).httpOnly(true).build();

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,cookie.toString()).body(new GenericMessage("logout success"));
    }

}
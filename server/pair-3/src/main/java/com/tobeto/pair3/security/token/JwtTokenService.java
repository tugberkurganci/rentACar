package com.tobeto.pair3.security.token;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tobeto.pair3.entities.User;
import com.tobeto.pair3.security.dtos.Credentials;
import com.tobeto.pair3.security.token.Token;
import com.tobeto.pair3.security.token.TokenRepository;
import com.tobeto.pair3.security.token.TokenService;
import com.tobeto.pair3.services.abstracts.UserService;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;


@Service
@RequiredArgsConstructor
public class JwtTokenService implements TokenService {

    SecretKey key= Keys.hmacShaKeyFor("secret-must-be-at-least-32-chars".getBytes());
    private ObjectMapper objectMapper=new ObjectMapper();

    private final UserService userService;

    @Autowired
    private TokenRepository tokenRepository;


    @Override
    public Token CreateToken(User user, Credentials credentials) {
        TokenSubject tokenSubject=new TokenSubject(user.getId());
        //long expirationMillis = System.currentTimeMillis() + (24 * 60 * 60 * 1000); // 24 saat
        long expirationMillis = System.currentTimeMillis() + ( 60 * 1000);
        Date expirationDate = new Date(expirationMillis);
        try {
            String subject=objectMapper.writeValueAsString(tokenSubject);
            String token= Jwts.builder().setSubject(subject).setExpiration(expirationDate).signWith(key).compact();
            return new Token(token,"Bearer");
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

    }

    @Override
    public User verifyToken(String authorizationHeader) {
        if(authorizationHeader==null) return null;
        String token = authorizationHeader.split(" ")[1];
        JwtParser parser=Jwts.parserBuilder().setSigningKey(key).build();
      try {
          Jws<Claims> claims= parser.parseClaimsJws(token);
          var subject=claims.getBody().getSubject();
         var tokenSubject= objectMapper.readValue(subject,TokenSubject.class);

          User user=userService.getOriginalUserById(tokenSubject.id);
          return user;
      }catch (JwtException ex){
          ex.printStackTrace();
      } catch (JsonProcessingException e) {
          throw new RuntimeException(e);
      }
        return null;
        

    }

    @Override
    public void logout(String authHeader) {
        if(authHeader==null) return;
        String token = authHeader.split(" ")[1];
        var tokenInDb=tokenRepository.findById(token);
        tokenInDb.ifPresent(value -> tokenRepository.deleteById(value.getToken()));

    }

    public static record TokenSubject (int id){}
}

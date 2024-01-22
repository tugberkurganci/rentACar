package com.tobeto.pair3.security.token;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tobeto.pair3.entities.User;
import com.tobeto.pair3.security.RefreshTokenRequest;
import com.tobeto.pair3.services.abstracts.UserService;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;


@Service
@RequiredArgsConstructor
public class JwtTokenService {

    SecretKey key= Keys.hmacShaKeyFor("secret-must-be-at-least-32-chars".getBytes());
    SecretKey key1 = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private ObjectMapper objectMapper=new ObjectMapper();

    private final UserService userService;
    private final TokenRepository tokenRepository;




    public Token CreateToken(User user,boolean isRefresh) {
        TokenSubject tokenSubject=new TokenSubject(user.getId());
        long expirationMillisForBaseToken = System.currentTimeMillis() + (24 * 60 * 60 * 1000); // 24 saat


        long expirationMillisForRefreshToken = System.currentTimeMillis() + ( 60 * 1000);
        Date expirationDateForRefresh = new Date(expirationMillisForRefreshToken);
        Date expirationDateForBase = new Date(expirationMillisForBaseToken);
        try {
            String subject=objectMapper.writeValueAsString(tokenSubject);
            String token1= Jwts.builder().setSubject(subject).setExpiration(expirationDateForRefresh).signWith(key).compact();
            String token2= Jwts.builder().setSubject(subject).setExpiration(expirationDateForBase).signWith(key).compact();
            Token token=new Token(token1,token2,"Bearer",user);
            if(isRefresh)tokenRepository.save(token);

            return token ;
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

    }


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

    public Token createRefeshToken(RefreshTokenRequest request) {

        Token token=tokenRepository.findByUserId(request.getUserId());
        User user=verifyToken("Bearer "+token.getBaseToken());
        if(user!=null) {
            Token token2=CreateToken(user,false);
            token.setRefreshToken(token2.getRefreshToken());
            return token;
        };
        return null;



    }

    public void deleteToken(int id) {
        tokenRepository.deleteByUserId(id);
    }


    public static record TokenSubject (int id){}
}

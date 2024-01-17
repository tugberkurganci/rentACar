package com.tobeto.pair3.security;


import com.tobeto.pair3.entities.User;
import com.tobeto.pair3.security.token.JwtTokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.io.IOException;

@Component
public class TokenFilter extends OncePerRequestFilter {

    @Autowired
    private JwtTokenService tokenService;

    @Qualifier("handlerExceptionResolver")
    @Autowired
    private HandlerExceptionResolver exceptionResolver;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String tokenWithPrefix = getTokenWithPrefix(request);
        if (tokenWithPrefix != null) {

            User user = tokenService.verifyToken(tokenWithPrefix);
            if (user != null) {

                if (!user.isEnabled()) {
                    exceptionResolver.resolveException(request, response, null, new DisabledException("user is disabled"));
                    return;

                }
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }


        }
        filterChain.doFilter(request, response);
    }


    private String getTokenWithPrefix(HttpServletRequest request) {
        var tokenWithPrefix = request.getHeader("Authorization");
        var cookies = request.getCookies();
        if (cookies == null) {
            return tokenWithPrefix;
        }
        ;
        for (var cookie : cookies
        ) {
            if (!cookie.getName().equals("car-token")) continue;
            if (cookie.getValue() == null || cookie.getValue().isEmpty()) {
                continue;
            }
            return "AnyPrefix " + cookie.getValue();

        }
        return null;
    }
}

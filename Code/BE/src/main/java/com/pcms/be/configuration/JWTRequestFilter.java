package com.pcms.be.configuration;

import com.pcms.be.domain.user.User;
import com.pcms.be.repository.UserRepository;
import com.pcms.be.service.JWTService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Optional;

@Component
public class JWTRequestFilter extends OncePerRequestFilter {
    private final JWTService jwtService;
    private final UserRepository userRepository;

    public JWTRequestFilter(JWTService _jwtService, UserRepository _userRepository) {
        this.jwtService = _jwtService;
        this.userRepository = _userRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String tokenHeader = request.getHeader("Authorization");
        if (tokenHeader != null && tokenHeader.startsWith("Bearer ")) {
            String token = tokenHeader.substring(7);

            try {
                String username = jwtService.getUsername(token);
                Optional<User> optionalUser = userRepository.findByUsernameIgnoreCase(username);

                if (optionalUser.isPresent()) {
                    User user = optionalUser.get();
                    UsernamePasswordAuthenticationToken authenticationToken;
                    authenticationToken = new UsernamePasswordAuthenticationToken(user, null, new ArrayList<>());
                    authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                }
            } catch (Exception e) {
                logger.error(e);
            }
        }
        filterChain.doFilter(request, response);
    }
}

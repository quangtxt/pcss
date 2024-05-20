package com.pcms.be.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.intercept.AuthorizationFilter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@Configuration
public class WebConfigSecurity {
    @Value("${cors.allowed-origins}")
    private List<String> allowedOrigins;
    @Value("${cors.allowed-methods}")
    private List<String> allowedMethods;
    @Value("${cors.allowed-headers}")
    private List<String> allowedHeaders;
    @Value("${cors.max-age}")
    private Long maxAge;
    private final JWTRequestFilter jwtRequestFilter;

    public WebConfigSecurity(JWTRequestFilter _jwtRequestFilter) {
        this.jwtRequestFilter = _jwtRequestFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> {
                    cors.configurationSource(request -> {
                        CorsConfiguration config = new CorsConfiguration();
                        config.setAllowedOrigins(allowedOrigins);
                        config.setAllowedMethods(allowedMethods);
                        config.setAllowedHeaders(allowedHeaders);
                        config.setMaxAge(maxAge);
                        return config;
                    });
                })
                .addFilterBefore(jwtRequestFilter, AuthorizationFilter.class)
                .authorizeHttpRequests(authorize ->
                        authorize
                                .anyRequest().permitAll());
        return http.build();
    }
}

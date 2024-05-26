package com.pcms.be.service;


import com.pcms.be.domain.user.User;
import com.pcms.be.errors.ApiException;
import com.pcms.be.errors.ErrorCode;
import com.pcms.be.pojo.DTO.TokenDTO;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.adapters.RefreshableKeycloakSecurityContext;
import org.keycloak.adapters.springsecurity.token.KeycloakAuthenticationToken;
import org.keycloak.representations.AccessToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@Slf4j
public class TokenService {

    public TokenDTO getToken() {
        try {
            TokenDTO tokenDTO = new TokenDTO();
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth instanceof KeycloakAuthenticationToken) {
                KeycloakAuthenticationToken keycloakAuthenticationToken = (KeycloakAuthenticationToken) auth;
                AccessToken accessToken = keycloakAuthenticationToken.getAccount().getKeycloakSecurityContext().getToken();
                tokenDTO.setUserName(accessToken.getPreferredUsername());
                tokenDTO.setPhoneNumber(accessToken.getPhoneNumber());
                tokenDTO.setUserId(accessToken.getSubject());
            } else {
                Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
                if (Objects.nonNull(authentication)) {
                    Object principal = authentication.getPrincipal();
                    if (principal instanceof User) {
                        String username = ((User) principal).getUsername();
                        tokenDTO.setUserName(username);
                    }
                }
            }
            return tokenDTO;
        } catch (Exception ex) {
            throw new ApiException(ErrorCode.UNAUTHORIZED);
        }
    }

    public static String getAccessToken() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return ((RefreshableKeycloakSecurityContext) auth.getCredentials()).getTokenString();
    }
}

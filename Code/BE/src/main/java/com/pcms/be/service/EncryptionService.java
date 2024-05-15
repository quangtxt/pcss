package com.pcms.be.service;

import jakarta.annotation.PostConstruct;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class EncryptionService {

    @Value("${encryption.salt.rounds}")
    private int saltRounds;
    private String salt;

    @PostConstruct
    public void postConstruct() {
        salt = BCrypt.gensalt(saltRounds);
    }

    public String encryptPassword(String password) {
        return BCrypt.hashpw(password, salt);
    }

    public boolean verifyPassword(String password, String hash) {
        return BCrypt.checkpw(password, hash);
    }

}

package com.pcms.be.repository;

import com.pcms.be.domain.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsernameIgnoreCase(String username);
    User findUserById(Integer id);
    Optional<User> findByEmail(String email);
    Page<User> findAllByRolesNameAndEmailContainingOrNameContaining(String roleName, String email, String fullName, Pageable pageable);
}
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
    Page<User> findAllByRolesName(String roleName, Pageable pageable);
    @Query(value = "SELECT DISTINCT u.* FROM v_user u " +
            "JOIN v_user_role ur ON u.id = ur.user_id " +
            "JOIN v_role r ON ur.role_id = r.id " +
            "WHERE r.name = 'STUDENT' AND u.id NOT IN (SELECT u.id FROM v_user u " +
            "JOIN v_members m ON u.id = m.user_id " +
            "WHERE m.status = 1);", nativeQuery = true)
    Page<User> findAllStudentNoneGroup(Pageable pageable);
}
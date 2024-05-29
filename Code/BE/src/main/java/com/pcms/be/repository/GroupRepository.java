package com.pcms.be.repository;

import com.pcms.be.domain.user.Group;
import com.pcms.be.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {
//    Group findByOwnerId(Long ownerId);
}

package com.pcms.be.repository;

import com.pcms.be.domain.user.Group;
import com.pcms.be.domain.user.GroupSupervisor;
import com.pcms.be.domain.user.Supervisor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GroupSupervisorRepository extends JpaRepository<GroupSupervisor, Long> {
    Optional<GroupSupervisor> findById(Long id);
    List<GroupSupervisor> findBySupervisorAndStatus(Supervisor supervisor, String status);
    List<GroupSupervisor> findAllByStatus(String status);
    GroupSupervisor findByGroupAndSupervisorAndStatus(Group group, Supervisor supervisor, String status);

}

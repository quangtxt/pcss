package com.pcms.be.repository;

import com.pcms.be.domain.user.Supervisor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SupervisorRepository extends JpaRepository<Supervisor, Long> {
    @Query("SELECT m "
            + "FROM Supervisor m "
            + "JOIN m.user u "
            + "WHERE u.email LIKE %:keyword% "
            + "   OR u.name LIKE %:keyword%")
    Page<Supervisor> findSupervisorsByEmailOrName(@Param("keyword") String keyword, Pageable pageable);
}

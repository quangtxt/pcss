package com.pcms.be.repository;

import com.pcms.be.domain.user.Supervisor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SupervisorRepository extends JpaRepository<Supervisor, Long> {
    @Query("SELECT m "
            + "FROM Supervisor m "
            + "JOIN m.user u "
            + "WHERE u.email LIKE %:keyword% "
            + "   OR u.name LIKE %:keyword%")
    Page<Supervisor> findSupervisorsByEmailOrName(@Param("keyword") String keyword, Pageable pageable);

    @Query(value = "SELECT s.* FROM v_supervisor s\n" +
            "where s.id NOT IN (\n" +
            "SELECT DISTINCT gs.supervisor_id\n" +
            "FROM v_group_supervisor gs)\n" +
            "UNION\n" +
            "SELECT s.* FROM v_supervisor s\n" +
            "where s.id IN (\n" +
            "Select gs.supervisor_id \n" +
            "from v_group_supervisor gs\n" +
            "GROUP BY gs.supervisor_id \n" +
            "Having Count(gs.group_id) <4)\n" +
            "ORDER BY Count(gs.group_id));", nativeQuery = true)
    List<Supervisor> findAllByHavingCountTotalGroupLessThanFour();
}

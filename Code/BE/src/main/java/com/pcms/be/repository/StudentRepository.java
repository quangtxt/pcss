package com.pcms.be.repository;

import com.pcms.be.domain.user.Student;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    @Query(value = "SELECT s.* " +
            "FROM v_student s " +
            "WHERE s.id NOT IN ( " +
            "    SELECT m.student_id " +
            "    FROM v_members m " +
            "    WHERE m.status = 'INGROUP' " +
            ")", nativeQuery = true)
    List<Student> findStudentsNotInMemberOrInactive();

    @Query(value = "SELECT s.* FROM v_student s " +
            "INNER JOIN v_user u ON u.id = s.user_id " +
            "WHERE u.email = :email", nativeQuery = true)
    Optional<Student> findByEmail(String email);

    //Page<Student> findAll(Pageable pageable, String keyword);
}

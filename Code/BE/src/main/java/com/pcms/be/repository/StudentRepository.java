package com.pcms.be.repository;

import com.pcms.be.domain.user.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository  extends JpaRepository<Student, Long> {

     @Query("SELECT s " +
             "FROM Student s " +
             "LEFT JOIN Member m ON s.id = m.student.id " +
             "WHERE m.status <> 'INGROUP' OR m IS NULL ")
    List<Student> findStudentsNotInMemberOrInactive();
}

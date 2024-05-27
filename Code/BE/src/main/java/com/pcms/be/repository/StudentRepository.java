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
//     @Query("SELECT s "
//            + "FROM Student s "
//            + "LEFT JOIN s.user u "
//            + "LEFT JOIN Member m ON u.id = m.user.id "
//            + "WHERE m IS NULL OR m.status = false")
//    List<Student> findStudentsNotInMemberOrInactive();
Optional<Student> findByAlternativeEmail(String email);
}

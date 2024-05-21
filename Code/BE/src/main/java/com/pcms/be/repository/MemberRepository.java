package com.pcms.be.repository;

import com.pcms.be.domain.user.Group;
import com.pcms.be.domain.user.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findByIdAndStatus(Integer id , boolean status);
    Member findByUserIdAndStatusTrue(Long id);
}

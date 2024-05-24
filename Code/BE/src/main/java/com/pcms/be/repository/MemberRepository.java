package com.pcms.be.repository;

import com.pcms.be.domain.user.Group;
import com.pcms.be.domain.user.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findByIdAndStatus(Integer id , boolean status);
    Member findByUserIdAndStatusTrue(Long id);
    List<Member> findAllByUserIdAndStatusFalse(Long id);
    Member findByUserIdAndGroupId(Long userId, int groupId);
    int deleteByUserIdAndGroupId(Long userId, int groupId);
    List<Member> findAllByGroupIdAndStatusTrue( Long groupId);
    Member findByGroupIdAndRole(Long groupId, Member.MemberRole role);
}

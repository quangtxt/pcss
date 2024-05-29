package com.pcms.be.repository;

import com.pcms.be.domain.user.Group;
import com.pcms.be.domain.user.Member;
import com.pcms.be.functions.Constants;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findByIdAndStatus(Integer id, String status);

    Member findByStudentIdAndStatus(Long id, String status);

    List<Member> findAllByStudentIdAndStatus(Long id, String status);

    Member findByStudentIdAndGroupId(Long userId, int groupId);

    //    int deleteByUserIdAndGroupId(Long userId, int groupId);
    List<Member> findAllByGroupId(int groupId);

    List<Member> findAllByGroupIdAndStatus(Long groupId, String status);

    List<Member> findAllByGroupIdAndStatusIn(Long groupId, List<String> statuses);

    Member findByGroupIdAndRole(Long groupId, String role);
}

package com.pcms.be.repository;

import com.pcms.be.domain.user.Group;
import com.pcms.be.domain.user.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {
//    Group findByOwnerId(Long ownerId);
    @Query(value = "SELECT g.* FROM (\n" +
            "            SELECT COUNT(m.id) as total_member, m.group_id as id\n" +
            "    FROM v_members m\n" +
            "    WHERE (m.status = 'INGROUP')\n" +
            "    GROUP BY m.group_id\n" +
            "    HAVING COUNT(m.id) < 5\n" +
            "    ORDER BY total_member desc)as cm\n" +
            "    INNER JOIN v_group g ON cm.id = g.id", nativeQuery = true)
    List<Group> findGroupsWithMemberCountLessThan(@Param("number") int number);

    Page<Group> findAllByNameContaining(Pageable pageable, String name);

    @Query(value="SELECT g.* FROM v_group g\n" +
            "WHERE g.id = (SELECT m.group_id FROM v_members m\n" +
            "WHERE m.student_id = :studentId);", nativeQuery = true)
    Optional<Group> findByStudentId(int studentId);
    @Query(value = "SELECT g.* FROM v_group g " +
            "WHERE g.semester_id IS NULL", nativeQuery = true)
    List<Group> findAllNewGroup();

//    SELECT g.* FROM v_group g  \n" +
//            "WHERE g.id IN(SELECT count_member.group_id FROM (SELECT COUNT(m.id) as total_member, m.group_id\n" +
//            "FROM v_members m\n" +
//            "WHERE m.status = 'INGROUP'\n" +
//            "GROUP BY m.group_id\n" +
//            "HAVING COUNT(m.id) < :number\n" +
//            "ORDER BY total_member desc)as count_member)
}

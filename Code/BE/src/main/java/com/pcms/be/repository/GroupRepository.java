package com.pcms.be.repository;

import com.pcms.be.domain.user.Group;
import com.pcms.be.domain.user.User;
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



//    SELECT g.* FROM v_group g  \n" +
//            "WHERE g.id IN(SELECT count_member.group_id FROM (SELECT COUNT(m.id) as total_member, m.group_id\n" +
//            "FROM v_members m\n" +
//            "WHERE m.status = 'INGROUP'\n" +
//            "GROUP BY m.group_id\n" +
//            "HAVING COUNT(m.id) < :number\n" +
//            "ORDER BY total_member desc)as count_member)
}

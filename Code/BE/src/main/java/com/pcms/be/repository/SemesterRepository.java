package com.pcms.be.repository;

import com.pcms.be.domain.Semester;
import org.checkerframework.checker.nullness.Opt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.OffsetDateTime;
import java.util.Optional;

@Repository
public interface SemesterRepository extends JpaRepository<Semester, Long> {
    @Query(value = "SELECT s.* FROM Semester s WHERE :now BETWEEN s.start_at AND s.end_at", nativeQuery = true)
    Optional<Semester> findByCurrent(@Param("now") OffsetDateTime now);
    Optional<Semester> findByName(String name);
    @Query(value = "SELECT s.* FROM Semester s WHERE s.id != :id AND s.name = :name", nativeQuery = true)
    Optional<Semester> findByNameAndDifferentCurrentSemester(String name, int id);
    Optional<Semester> findByCode(String code);
    @Query(value = "SELECT s.* FROM Semester s WHERE s.id != :id AND s.code = :code", nativeQuery = true)
    Optional<Semester> findByCodeAndDifferentCurrentSemester(String code, int id);
    @Query(value = "SELECT s.*\n" +
            "FROM Semester s\n" +
            "WHERE (:startAt BETWEEN s.start_at AND s.end_at)\n" +
            "   OR (:endAt BETWEEN s.start_at AND s.end_at)\n"+
            "   OR (s.start_at BETWEEN :startAt AND :endAt)\n"+
            "   OR (s.end_at BETWEEN :startAt AND :endAt)\n", nativeQuery = true)
    Optional<Semester> findByOffsetDateTimeValid(OffsetDateTime startAt, OffsetDateTime endAt);
    @Query(value = "SELECT s.*\n" +
            "FROM Semester s\n" +
            "WHERE s.id != :id AND ((:startAt BETWEEN s.start_at AND s.end_at)\n" +
            "   OR (:endAt BETWEEN s.start_at AND s.end_at)\n"+
            "   OR (s.start_at BETWEEN :startAt AND :endAt)\n"+
            "   OR (s.end_at BETWEEN :startAt AND :endAt))\n", nativeQuery = true)
    Optional<Semester> findByOffsetDateTimeValidAndDifferentCurrentSemester(OffsetDateTime startAt, OffsetDateTime endAt, int id);
}

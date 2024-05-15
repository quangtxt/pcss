package com.pcms.be.repository;

import com.pcms.be.domain.SpecificMajor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpecificMajorRepository extends JpaRepository<SpecificMajor, Long> {
}

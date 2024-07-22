package com.novo3.shopfront.repository;

import com.novo3.shopfront.repository.entity.SchoolEntity;
import com.sun.istack.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SchoolRepository extends JpaRepository<SchoolEntity, Integer> {

    SchoolEntity findSchoolEntityByCode(@NotNull final String code);

}

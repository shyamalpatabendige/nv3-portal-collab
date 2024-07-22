package com.novo3.shopfront.service;

import com.novo3.shopfront.api.base.School;
import com.novo3.shopfront.repository.entity.SchoolEntity;
import com.novo3.shopfront.repository.SchoolRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@AllArgsConstructor
public class SchoolService {

    private final SchoolRepository schoolRepository;

    public School getSchool(String code){

        SchoolEntity school = schoolRepository.findSchoolEntityByCode(code);

        if (school != null) {

            return School.builder()
                    .name(school.getName())
                    .code(code)
                    .banner(school.getBanner())
                    .description(school.getDescription())
                    .img(school.getImg())
                    .build();
        }else {
            log.warn("Unable to find school for the given code, code=\"{}\"", code);
            return null;
        }
    }
}

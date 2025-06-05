package com.choongang.univ.portal.auth.service;

import com.choongang.univ.portal.dto.AdminDto;
import com.choongang.univ.portal.dto.ExRelationDto;
import com.choongang.univ.portal.dto.StudentDto;


public interface MemberAuthService {
    ExRelationDto loginExRelation(ExRelationDto exRelationDto);

    AdminDto validateAdminIdDuplicate(AdminDto adminDto);
    void registerAdmin(AdminDto adminDto);

    StudentDto loginStudentDto(StudentDto studentDto);

}

package com.choongang.univ.portal.auth.mapper;

import com.choongang.univ.portal.dto.AdminDto;
import com.choongang.univ.portal.dto.ExRelationDto;
import com.choongang.univ.portal.dto.StudentDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MemberAuthSqlMapper {
    ExRelationDto findExRelationDtoForLogin(ExRelationDto exRelationDto);

    AdminDto findAdminDtoByAdminId(AdminDto adminDto);
    void insertAdmin(AdminDto adminDto);

    StudentDto findStudentDtoForLogin(StudentDto studentDto);

}

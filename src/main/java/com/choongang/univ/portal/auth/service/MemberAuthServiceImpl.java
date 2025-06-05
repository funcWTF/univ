package com.choongang.univ.portal.auth.service;

import com.choongang.univ.portal.auth.mapper.MemberAuthSqlMapper;
import com.choongang.univ.portal.dto.AdminDto;
import com.choongang.univ.portal.dto.ExRelationDto;
import com.choongang.univ.portal.dto.StudentDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


@Slf4j
@Service
@RequiredArgsConstructor
public class MemberAuthServiceImpl implements MemberAuthService{

    private final MemberAuthSqlMapper memberAuthSqlMapper;

    @Override
    public AdminDto validateAdminIdDuplicate(AdminDto adminDto) {
        return memberAuthSqlMapper.findAdminDtoByAdminId(adminDto);
    }

    @Override
    public ExRelationDto loginExRelation(ExRelationDto exRelationDto) {
        return memberAuthSqlMapper.findExRelationDtoForLogin(exRelationDto);
    }

    @Override
    public StudentDto loginStudentDto(StudentDto studentDto) {
        return memberAuthSqlMapper.findStudentDtoForLogin(studentDto);
    }
}

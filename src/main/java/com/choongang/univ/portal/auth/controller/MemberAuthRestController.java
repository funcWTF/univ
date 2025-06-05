package com.choongang.univ.portal.auth.controller;

import com.choongang.univ.portal.auth.mapper.MemberAuthSqlMapper;
import com.choongang.univ.portal.auth.service.MemberAuthService;
import com.choongang.univ.portal.dto.AdminDto;
import com.choongang.univ.portal.dto.ExRelationDto;
import com.choongang.univ.portal.dto.StudentDto;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("api/portal/auth")
@RequiredArgsConstructor
public class MemberAuthRestController {

    private final MemberAuthService memberAuthService;
    private final MemberAuthSqlMapper memberAuthSqlMapper;

    @RequestMapping("exRelationLoginProcess")
    public Map<String, Object> exRelationLoginProcess(
            @RequestBody ExRelationDto exRelationDtoRequest,
            HttpSession session
    ) {
        log.info(String.valueOf(exRelationDtoRequest));
        ExRelationDto exRelationDto = memberAuthService.loginExRelation(exRelationDtoRequest);
        log.info(String.valueOf(exRelationDto));

        if (exRelationDto == null) {
            return Map.of("result", false);
        } else {
            session.setAttribute("exRelationLoginInfo", exRelationDto);
            return Map.of("result", exRelationDto);
        }
    }

    @RequestMapping("adminIdCheck")
    public Map<String, Object> adminIdCheck(
            @ModelAttribute AdminDto adminDtoRequest
    ) {
        log.info(String.valueOf(adminDtoRequest));
        AdminDto adminDto = memberAuthService.validateAdminIdDuplicate(adminDtoRequest);
        log.info(String.valueOf(adminDto));
        if (adminDto == null) {
            return Map.of("result", true);
        } else {
            return Map.of("result", false);
        }
    }

    @RequestMapping("adminRegisterProcess")
    public Map<String, Object> adminRegisterProcess(
            @ModelAttribute AdminDto adminDtoRequest,
            @RequestParam("idPhotoLoc") MultipartFile idPhotoLoc
    ) {
        log.info(String.valueOf(adminDtoRequest));
        return Map.of();
    }

    @RequestMapping("studentLoginProcess")
    public Map<String, Object> studentLoginProcess(
            @RequestBody StudentDto studentDtoRequest,
            HttpSession session
    ) {
        log.info(String.valueOf(studentDtoRequest));

        StudentDto studentDto = memberAuthService.loginStudentDto(studentDtoRequest);
        log.info(String.valueOf(studentDto));

        if (studentDto == null) {
            return Map.of("result", false);
        } else {
            session.setAttribute("studentLoginInfo", studentDto);
            return Map.of("result", studentDto);
        }
    }

}

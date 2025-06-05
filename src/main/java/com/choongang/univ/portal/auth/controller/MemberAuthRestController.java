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
        ExRelationDto exRelationDto = memberAuthService.loginExRelation(exRelationDtoRequest);

        if (exRelationDto == null) {
            return Map.of("result", false);
        } else {
            session.setAttribute("exRelationLoginInfo", exRelationDto);
            return Map.of("result", exRelationDto);
        }
    }

    @RequestMapping("adminIdDuplicateCheck")
    public Map<String, Object> adminIdDuplicateCheck(
            @ModelAttribute AdminDto adminDtoRequest
    ) {
        AdminDto adminDto = memberAuthService.validateAdminIdDuplicate(adminDtoRequest);

        if (adminDto == null) {
            return Map.of("result", true);
        } else {
            return Map.of("result", false);
        }
    }

    @RequestMapping("adminRegisterProcess")
    public Map<String, Object> adminRegisterProcess(
            @ModelAttribute("adminRegRequest") AdminDto adminDtoRequest
//            @RequestParam("photoLoc") MultipartFile idPhotoLoc
    ) {
//        log.info(String.valueOf(adminDtoRequest));
        memberAuthService.registerAdmin(adminDtoRequest);
        log.info(String.valueOf(adminDtoRequest));

        return Map.of();
    }


    @RequestMapping("studentLoginProcess")
    public Map<String, Object> studentLoginProcess(
            @RequestBody StudentDto studentDtoRequest,
            HttpSession session
    ) {
        StudentDto studentDto = memberAuthService.loginStudentDto(studentDtoRequest);

        if (studentDto == null) {
            return Map.of("result", false);
        } else {
            session.setAttribute("studentLoginInfo", studentDto);
            Object object = session.getAttribute("studentLoginInfo");
            return Map.of("result", studentDto);
        }
    }

    @RequestMapping("studentSessionCheck")
    public Map<String, Object> studentSessionCheck(
            HttpSession session
    ) {
        StudentDto studentDto = (StudentDto) session.getAttribute("studentLoginInfo");

        if (studentDto != null) {
            return Map.of("login", true, "user", studentDto);
        } else {
            return Map.of("login", false);
        }

    }

    @PostMapping("studentLogout")
    public Map<String, Object> studentLogout(HttpSession session) {
        session.invalidate(); // 세션 삭제
        return Map.of("result", true);
    }

}

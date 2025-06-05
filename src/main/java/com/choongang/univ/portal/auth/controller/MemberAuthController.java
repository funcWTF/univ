package com.choongang.univ.portal.auth.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("portal")
public class MemberAuthController {

    @RequestMapping("exRelationLoginPage")
    public String exRelationLogin() {
        return "/portal/auth/login/exRelationLoginPage";
    }

    @RequestMapping("adminRegisterPage")
    public String adminRegisterPage() {
        return "/portal/auth/register/adminRegisterPage";
    }

    @RequestMapping("studentLoginPage")
    public String studentLoginPage() {
        return "/portal/auth/login/studentLoginPage";
    }

}

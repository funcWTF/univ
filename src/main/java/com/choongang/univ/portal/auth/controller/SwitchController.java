package com.choongang.univ.portal.auth.controller;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("switch")
public class SwitchController {

    @RequestMapping("jobExRelationPage")
    public String jobExRelationPage() {
        return "/job/jobExRelationPage";
    }
    @RequestMapping("barrierFreeExRelationPage")
    public String barrierFreeExRelationPage() {
        return "/barrierfree/barrierFreeExRelationPage";
    }
    @RequestMapping("internshipExRelationPage")
    public String internshipExRelationPage() {
        return "/internship/internshipExRelationPage";
    }
    @RequestMapping("residenceExRelationPage")
    public String residenceExRelationPage() {
        return "/residence/residenceExRelationPage";
    }
    @RequestMapping("lifeEduStudentExRelationPage")
    public String lifeEduStudentExRelationPage() {
        return "/lifeedu/lifeEduStudentExRelationPage";
    }
    @RequestMapping("lifeEduInstructorExRelationPage")
    public String lifeEduInstructorExRelationPage() {
        return "/lifeedu/lifeEduInstructorExRelationPage";
    }
}

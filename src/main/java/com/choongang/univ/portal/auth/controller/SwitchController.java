package com.choongang.univ.portal.auth.controller;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@Controller
@RequiredArgsConstructor
public class SwitchController {

    @RequestMapping("exRelation/job")
    public String jobExRelationPage() {
        return "/job/jobExRelationPage";
    }
    @RequestMapping("exRelation/barrierFree")
    public String barrierFreeExRelationPage() {
        return "/barrierfree/barrierFreeExRelationPage";
    }
    @RequestMapping("exRelation/internship")
    public String internshipExRelationPage() {
        return "/internship/internshipExRelationPage";
    }
    @RequestMapping("exRelation/residence")
    public String residenceExRelationPage() {
        return "/residence/residenceExRelationPage";
    }
    @RequestMapping("exRelation/lifeEduStudent")
    public String lifeEduStudentExRelationPage() {
        return "/lifeedu/lifeEduStudentExRelationPage";
    }
    @RequestMapping("exRelation/lifeEduInstructor")
    public String lifeEduInstructorExRelationPage() {
        return "/lifeedu/lifeEduInstructorExRelationPage";
    }

    @RequestMapping("job")
    public String jobStudentPage() {
        return "/job/jobStudentPage";
    }
    @RequestMapping("barrierFree")
    public String barrierFreeStudentPage() {
        return "/barrierfree/barrierFreeStudentPage";
    }
    @RequestMapping("internship")
    public String internshipStudentPage() {
        return "/internship/internshipStudentPage";
    }
    @RequestMapping("residence")
    public String residenceStudentPage() {
        return "/residence/residenceStudentPage";
    }
}

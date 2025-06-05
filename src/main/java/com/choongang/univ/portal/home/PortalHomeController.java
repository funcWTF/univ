package com.choongang.univ.portal.home;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@Controller
@RequestMapping("portal")
@RequiredArgsConstructor
public class PortalHomeController {

    @RequestMapping("mainPage")
    public String mainPage() {
        return "/portal/home/studentPortal";
    }
}

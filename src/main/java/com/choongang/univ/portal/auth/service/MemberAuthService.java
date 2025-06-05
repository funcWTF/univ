package com.choongang.univ.portal.auth.service;

import com.choongang.univ.portal.dto.AdminDto;
import com.choongang.univ.portal.dto.ExRelationDto;


public interface MemberAuthService {
    ExRelationDto loginExRelation(ExRelationDto exRelationDto);
    AdminDto validateAdminIdDuplicate(AdminDto adminDto);

}

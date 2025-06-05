package com.choongang.univ.portal.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class AdminDto {
    private int id;
    private String adminId;
    private String password;
    private String name;
    private String registrationId;
    private String birth;
    private String gender;
    private String email;
    private String phone;
    private String address;
    private MultipartFile idPhotoLoc;
    private String center;
    private LocalDateTime createdAt;
}

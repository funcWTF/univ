package com.choongang.univ.portal.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class StudentDto {
    private int id;
    private int major;
    private int subMajor;
    private String studentId;
    private String password;
    private String name;
    private String registerId;
    private LocalDate birth;
    private String email;
    private String phone;
    private String address;
    private String idPhotoLoc;
    private LocalDate entranceDate;
    private String status;
    private int grade;
    private LocalDateTime createdAt;
}

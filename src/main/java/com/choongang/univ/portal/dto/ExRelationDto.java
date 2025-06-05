package com.choongang.univ.portal.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ExRelationDto {
    private int id;
    private String accountName;
    private String password;
    private String center;
    private LocalDateTime createdAt;
}

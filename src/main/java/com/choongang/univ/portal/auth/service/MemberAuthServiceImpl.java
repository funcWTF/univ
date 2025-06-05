package com.choongang.univ.portal.auth.service;

import com.choongang.univ.portal.auth.mapper.MemberAuthSqlMapper;
import com.choongang.univ.portal.dto.AdminDto;
import com.choongang.univ.portal.dto.ExRelationDto;
import com.choongang.univ.portal.dto.StudentDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;


@Slf4j
@Service
@RequiredArgsConstructor
public class MemberAuthServiceImpl implements MemberAuthService{

    @Autowired
    @Qualifier("fileRootPath")
    private String fileRootPath;

    private final MemberAuthSqlMapper memberAuthSqlMapper;

    @Override
    public AdminDto validateAdminIdDuplicate(AdminDto adminDto) {
        return memberAuthSqlMapper.findAdminDtoByAdminId(adminDto);
    }

    @Override
    public ExRelationDto loginExRelation(ExRelationDto exRelationDto) {
        return memberAuthSqlMapper.findExRelationDtoForLogin(exRelationDto);
    }

    @Override
    public StudentDto loginStudentDto(StudentDto studentDto) {
        return memberAuthSqlMapper.findStudentDtoForLogin(studentDto);
    }

    @Override
    public void registerAdmin(AdminDto adminDto) {
        MultipartFile multipartFile = adminDto.getIdPhotoFile();
        String IdPhotoLoc = "";
        try {
            IdPhotoLoc = makePhotoLocation(multipartFile.getBytes(), multipartFile.getOriginalFilename(), adminDto.getAdminId());
        } catch (IOException e) {
//            throw new RuntimeException(e);
            e.fillInStackTrace();
        }
        adminDto.setIdPhotoLoc(IdPhotoLoc);

        memberAuthSqlMapper.insertAdmin(adminDto);
    }

    private String makePhotoLocation(byte[] buffer, String originalFilename, String id) {

        String fileDirPathString = fileRootPath + id + "/";
//        registerFilmAdditionalInfoDto.setUrlMain(fileDirPathString);
//        System.out.println("fileDirPathString = " + fileDirPathString);

        File fileDirPath = new File(fileDirPathString);
        if (!fileDirPath.exists()) {
            fileDirPath.mkdirs();
        }

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy_MM_dd");
        String fileNameByDate = simpleDateFormat.format(new Date());

        String uuid = UUID.randomUUID().toString();
        long currentTime = System.currentTimeMillis();
        String fileNameByUUIDAndTime = uuid + "_" + currentTime;

        String fileName = fileNameByDate + "_" + fileNameByUUIDAndTime;
        String ext = originalFilename.substring(originalFilename.lastIndexOf("."));
        fileName += ext;
//        System.out.println("fileName = " + fileName);

        ByteArrayInputStream inputStream = new ByteArrayInputStream(buffer);
//        System.out.println("inputStream = " + inputStream);
        try {
            Thumbnails.of(inputStream).scale(1.0)
                    .toFile(fileDirPathString + fileName);
        } catch (IOException e) {
//            throw new RuntimeException(e);
            e.printStackTrace();
        }

        return fileName;
    }
}

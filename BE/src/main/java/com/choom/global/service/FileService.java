package com.choom.global.service;

import com.choom.global.exception.FileDeleteException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.InetAddress;
import java.net.URLEncoder;
import java.net.UnknownHostException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.UUID;

@Service
@Slf4j
public class FileService {
    public String fileUpload(String type, MultipartFile image) throws IOException {
        //서버에 파일 저장
        String hostname = InetAddress.getLocalHost().getHostName();
        UUID uuid = UUID.randomUUID();
        String name = uuid.toString() + image.getOriginalFilename();
        String path = "";
        File file = null;

        if (hostname.substring(0, 7).equals("DESKTOP")) {
            path = "C:/choom/" + type + "/";
            file = new File(path + name);
        } else {
            path = "/var/lib/choom/" + type + "/";
            file = new File(path + name);
        }

        if (!file.getParentFile().exists())
            file.getParentFile().mkdirs();

        image.transferTo(file);
        return "/choom/" + type + "/" + name;
    }

    public Resource fileDownload(String path, HttpHeaders headers) throws IOException {
        String hostname = InetAddress.getLocalHost().getHostName();
        if (hostname.substring(0, 7).equals("DESKTOP")) {
            path = "C:" + path;
        } else {
            path = "/var/lib" + path;
        }

        Resource resource = new FileSystemResource(path);

        // 원본 파일에서 uuid 자르기
        String filename = resource.getFilename().substring(36);
        log.info("filename : "+filename);

        String downloadName = URLEncoder.encode(filename, StandardCharsets.UTF_8).replaceAll("\\+","%20");
        String contentType = Files.probeContentType(resource.getFile().toPath());

        headers.add("Content-type", contentType);
        headers.add("Content-Disposition", "attachment; filename=" + downloadName);

        return resource;
    }

    public void fileDelete(String path) throws UnknownHostException {
        String hostname = InetAddress.getLocalHost().getHostName();
        if (hostname.substring(0, 7).equals("DESKTOP")) {
            path = "C:" + path;
        } else {
            path = "/var/lib" + path;
        }

        File file = new File(path);
        if (!file.delete())
            throw new FileDeleteException("파일 삭제에 실패했습니다");
    }
}

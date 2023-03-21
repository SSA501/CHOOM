package com.choom.global.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.InetAddress;
import java.util.UUID;

@Service
public class FileService {
    public String fileUpload(String type, MultipartFile image) throws IOException {
        //서버에 파일 저장
        String hostname = InetAddress.getLocalHost().getHostName();
        UUID uuid = UUID.randomUUID();
        String name = uuid.toString() + image.getOriginalFilename();
        String path = "";
        File file = null;

        if (hostname.substring(0, 7).equals("DESKTOP")) {
            path = "C:/choom/uploads/" + type + "/";
            file = new File(path + name);
        } else {
            path = "/var/lib/choom/" + type + "/";
            file = new File(path + name);
        }

        if (!file.getParentFile().exists())
            file.getParentFile().mkdirs();

        image.transferTo(file);
        return path + name;
    }
}

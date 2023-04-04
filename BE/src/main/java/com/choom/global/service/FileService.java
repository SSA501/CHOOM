package com.choom.global.service;

import com.choom.global.exception.FileDeleteException;
import lombok.extern.slf4j.Slf4j;
import net.bramp.ffmpeg.FFmpeg;
import net.bramp.ffmpeg.FFmpegExecutor;
import net.bramp.ffmpeg.builder.FFmpegBuilder;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.net.InetAddress;
import java.net.URL;
import java.net.URLEncoder;
import java.net.UnknownHostException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
@Slf4j
public class FileService {
    public String fileUpload(String type, MultipartFile image) throws IOException {
        //서버에 파일 저장
//        String hostname = InetAddress.getLocalHost().getHostName();
        UUID uuid = UUID.randomUUID();
        String name = uuid.toString() + image.getOriginalFilename().replaceAll(" ","");
        log.info(name);
//        String path = "";
        File file = null;

//        if (hostname.substring(0, 7).equals("DESKTOP")) {
//            path = "C:/choom/" + type + "/";
//        } else {
//            path = "/var/lib/choom/" + type + "/";
//        }
        String path = setPath(type);
        file = new File(path + name);

        if (!file.getParentFile().exists())
            file.getParentFile().mkdirs();

        image.transferTo(file);
        return "/choom/" + type + "/" + name;
    }

    public Resource fileDownload(String path, HttpHeaders headers) throws IOException {
//        String hostname = InetAddress.getLocalHost().getHostName();
//        if (hostname.substring(0, 7).equals("DESKTOP")) {
//            path = "C:" + path;
//        } else {
//            path = "/var/lib" + path;
//        }
        Resource resource = new FileSystemResource(getPath(path));

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
//        String hostname = InetAddress.getLocalHost().getHostName();
//        if (hostname.substring(0, 7).equals("DESKTOP")) {
//            path = "C:" + path;
//        } else {
//            path = "/var/lib" + path;
//        }

        File file = new File(getPath(path));
        if (!file.delete())
            throw new FileDeleteException("파일 삭제에 실패했습니다");
    }

    public String saveProfileImage(String type, String nickname, String profileImage) {
        try {
            URL imgURL = new URL(profileImage);
            BufferedImage image = ImageIO.read(imgURL);

            //서버에 파일 저장
//            String hostname = InetAddress.getLocalHost().getHostName();
            UUID uuid = UUID.randomUUID();
            String name = nickname + uuid.toString() + ".";
//            String path = "";
            File file = null;
            String extension = "png";

//            if (hostname.substring(0, 7).equals("DESKTOP")) {
//                path = "C:/choom/" + type + "/";
//            } else {
//                path = "/var/lib/choom/" + type + "/";
//            }

            String path = setPath(type);
            file = new File(path + name + extension);

            if (!file.getParentFile().exists())
                file.getParentFile().mkdirs();

            ImageIO.write(image, extension, file);
            return "/choom/" + type + "/" + name + extension;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public String extractAudio(String videoPath) throws IOException {
//        String hostname = InetAddress.getLocalHost().getHostName();
        String name = videoPath.split("/")[3].split("\\.")[0] + ".mp3";
        log.info(name);

        String audioPath = "";
        String ffmpegPath = "";

//        if (hostname.substring(0, 7).equals("DESKTOP")) {
////            videoPath = "C:" + videoPath;
////            audioPath = "C:/choom/audio/";
//            ffmpegPath = "C:/choom/ffmpeg/";
//        } else {
////            videoPath = "/var/lib" + videoPath;
////            audioPath = "/var/lib/choom/audio/";
//            ffmpegPath = "/var/lib/choom/ffmpeg/";
//        }

        audioPath = setPath("audio");
        ffmpegPath = setPath("ffmpeg");
        Path inputPath = Paths.get(getPath(videoPath));
        Path outputPath = Paths.get(audioPath + name);
        FFmpeg ffmpeg = new FFmpeg(ffmpegPath + "ffmpeg");

        FFmpegBuilder builder = new FFmpegBuilder()
                .setInput(inputPath.toString())
                .addOutput(outputPath.toString())
                .setFormat("mp3")
                .setAudioCodec("libmp3lame")
                .setAudioSampleRate(44100)
                .setAudioBitRate(192000)
                .done();

        ffmpeg.run(builder);

        return "/choom/audio/" + name;
    }

    public String combineAudioVideo(String videoPath, String audioPath) throws IOException {
//        String hostname = InetAddress.getLocalHost().getHostName();
        String ffmpegPath = "";
        String name = "new" + videoPath.split("/")[3];
        String newVideoPath = "";
//        if (hostname.substring(0, 7).equals("DESKTOP")) {
////            newVideoPath = "C:/choom/mydance/" + name;
////            videoPath = "C:" + videoPath;
////            audioPath = "C:" + audioPath;
//            ffmpegPath = "C:/choom/ffmpeg";
//        } else {
////            newVideoPath = "/var/lib/choom/mydance/" + name;
////            videoPath = "/var/lib" + videoPath;
////            audioPath = "/var/lib" + audioPath;
//            ffmpegPath = "/var/lib/choom/ffmpeg";
//        }
        newVideoPath = setPath("mydance") + name;
        ffmpegPath = setPath("ffmpeg");
        log.info("newVideoPath : " + newVideoPath);
        log.info("video : " + videoPath);
        log.info("audio : " + audioPath);
        // 입력 영상 파일
        File videoFile = new File(getPath(videoPath));
        // 입력 오디오 파일
        File audioFile = new File(getPath(audioPath));
        // 출력 파일
        File outputFile = new File(newVideoPath); // 덮어씌우기? 안되는듯?

        FFmpeg ffmpeg = new FFmpeg(ffmpegPath + "ffmpeg");

        // FFmpegExecutor 및 FFprobeExecutor 생성
        FFmpegExecutor executor = new FFmpegExecutor(ffmpeg);

        // FFmpegBuilder 생성 및 병합 옵션 설정
        FFmpegBuilder builder = new FFmpegBuilder()
                .setInput(videoFile.getAbsolutePath())
                .overrideOutputFiles(true)
                .addInput(audioFile.getAbsolutePath())
                .addOutput(outputFile.getAbsolutePath())
                .setFormat("mp4")
                .setVideoCodec("copy")
                .setAudioCodec("aac")
                .done();

        // FFmpeg를 사용하여 영상 및 오디오 파일 병합
        executor.createJob(builder).run();

        log.info("파일이 성공적으로 합쳐졌습니다: " + outputFile.getAbsolutePath());

        return "/choom/mydance/" + name;
    }

    private String setPath(String type) throws UnknownHostException {
        String hostname = InetAddress.getLocalHost().getHostName();
        String path = "";

        if (hostname.substring(0, 7).equals("DESKTOP")) {
            path = "C:/choom/" + type + "/";
        } else {
            path = "/var/lib/choom/" + type + "/";
        }

        return path;
    }

    private String getPath(String path) throws UnknownHostException {
        String hostname = InetAddress.getLocalHost().getHostName();

        if (hostname.substring(0, 7).equals("DESKTOP")) {
            path = "C:" + path;
        } else {
            path = "/var/lib" + path;
        }

        return path;
    }
}

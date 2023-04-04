package com.choom.global.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import net.bramp.ffmpeg.FFmpeg;
import net.bramp.ffmpeg.FFmpegExecutor;
import net.bramp.ffmpeg.builder.FFmpegBuilder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class VideoService {
    public static void mergeVideoAndAudio()
        throws IOException {
        Path inputPath = Paths.get("C:/choom/audio.mp4");
        Path outputPath = Paths.get("C:/choom/audio.mp3");

        FFmpeg ffmpeg = new FFmpeg("C:/choom/ffmpeg");

        FFmpegBuilder builder1 = new FFmpegBuilder()
            .setInput(inputPath.toString())
            .addOutput(outputPath.toString())
            .setFormat("mp3")
            .setAudioCodec("libmp3lame")
            .setAudioSampleRate(44100)
            .setAudioBitRate(192000)
            .done();

        ffmpeg.run(builder1);

        // 입력 영상 파일
        File videoFile = new File("C:/choom/input.mp4");
        // 입력 오디오 파일
        File audioFile = new File("C:/choom/audio.mp3");
        // 출력 파일
        File outputFile = new File("C:/choom/output.mp4");

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
    }
}

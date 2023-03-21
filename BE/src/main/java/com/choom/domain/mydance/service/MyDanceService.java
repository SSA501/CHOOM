package com.choom.domain.mydance.service;

import com.choom.domain.mydance.dto.MyDanceAddRequestDto;
import com.choom.domain.mydance.dto.MyDanceAddResponseDto;
import com.choom.domain.mydance.entity.MyDance;
import com.choom.domain.mydance.entity.MyDanceRepository;
import com.choom.domain.originaldance.entity.OriginalDance;
import com.choom.domain.originaldance.entity.OriginalDanceRepository;
import com.choom.domain.user.entity.User;
import com.choom.domain.user.service.UserService;
import com.choom.global.service.FileService;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.*;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class MyDanceService {

    private final UserService userService;

    //    private final OriginalDanceService originalDanceService;
    private final OriginalDanceRepository originalDanceRepository;

    private final FileService fileService;

    private final MyDanceRepository myDanceRepository;

    public MyDanceAddResponseDto addMyDance(MyDanceAddRequestDto myDanceAddRequestDto, MultipartFile videoFile, MultipartFile jsonFile) throws IOException {
        // 내 챌린지 영상 업로드
        String videoPath = fileService.fileUpload("mydance", videoFile);

        // 내 챌린지 좌표 업로드
        String jsonPath = fileService.fileUpload("mycoordinate", jsonFile);

        // 일치율 계산
        HashMap<String, Object> result = calculate(1L, jsonPath);
        log.info(String.valueOf(result));

        // MY_DANCE insert
        // user, originalDance 더미데이터
        User user = userService.findUserById(1L).get();
        OriginalDance originalDance = originalDanceRepository.findById(1L).get();
        MyDance myDance = MyDance.builder()
                .score((int) result.get("score"))
                .matchRate((String) result.get("matchRate"))
                .videoPath(videoPath)
                .videoLength(myDanceAddRequestDto.getVideoLength())
                .title(myDanceAddRequestDto.getTitle())
                .user(user)
                .originalDance(originalDance)
                .build();
        MyDance insertResult = myDanceRepository.save(myDance);

        return MyDanceAddResponseDto.builder()
                .myDance(insertResult)
                .build();

    }

    private HashMap<String, Object> calculate(Long originalDanceId, String myDanceCoordinatePath) throws IOException {
        HashMap<String, Object> result = new HashMap<>();
        ArrayList<Double> matchRates = new ArrayList<Double>();
        double similaritySum = 0.0;

        /*
        coordinate에서 result를 가져오는 code
        String originalDanceJsonFile = originalDanceService.findById(originalDanceId);
         */

        // 현재는 그냥 더미 데이터로 테스트
        Reader originalDanceCoordinate = new FileReader("C:\\Users\\SSAFY\\Downloads\\jsonexample.json");
        Reader myDanceCoordinate = new FileReader(myDanceCoordinatePath);

        JsonParser parser = new JsonParser();
        JsonArray originalResult = parser.parse(originalDanceCoordinate).getAsJsonArray();
        JsonArray myResult = parser.parse(myDanceCoordinate).getAsJsonArray();

        // JsonArray에서 하나씩 처리
        if (myResult.size() > 0) {
            // 내 챌린지 영상 frame 개수만큼 반복
            // 원본 영상보다 내 챌린지 영상이 긴 경우는 없다고 가정
            for (int i = 0; i < myResult.size(); i++) {
                // keypoints 배열
                JsonArray originalKeypoints = originalResult.get(i).getAsJsonObject().get("keypoints").getAsJsonArray();
                JsonArray myKeypoints = myResult.get(i).getAsJsonObject().get("keypoints").getAsJsonArray();

                double similarity = calculate(originalKeypoints, myKeypoints);

                similaritySum += similarity;
                matchRates.add(similarity);

            }
        }

        // mycoordinate 파일 삭제
        myDanceCoordinate.close();
        File file = new File(myDanceCoordinatePath);
        file.delete();

        result.put("matchRate", matchRates.toString());
        result.put("score", (int) similaritySum / myResult.size());
        return result;
    }

    private double calculate(JsonArray originalKeypoints, JsonArray myKeypoints) {
        // 관절 벡터 배열
        int[][] joints = {
                {8, 12},
                {7, 11},
                {8, 7},
                {12, 14},
                {16, 14},
                {16, 20},
                {16, 18},
                {11, 13},
                {13, 15},
                {15, 19},
                {15, 17},
                {12, 11},
                {12, 24},
                {11, 23},
                {24, 23},
                {24, 26},
                {26, 28},
                {28, 32},
                {28, 30},
                {23, 25},
                {25, 27},
                {27, 29},
                {27, 31},
        };

        double sum = 0;
        double accuracySum = 0;

        for (int[] joint : joints) {
            JsonObject originalKeypoint1 = originalKeypoints.get(joint[0]).getAsJsonObject();
            JsonObject originalKeypoint2 = originalKeypoints.get(joint[1]).getAsJsonObject();

            JsonObject myKeypoint1 = myKeypoints.get(joint[0]).getAsJsonObject();
            JsonObject myKeypoint2 = myKeypoints.get(joint[1]).getAsJsonObject();

            Map<String, Double> originalVector = Map.of(
                    "x", originalKeypoint1.get("x").getAsDouble() - originalKeypoint2.get("x").getAsDouble(),
                    "y", originalKeypoint1.get("y").getAsDouble() - originalKeypoint2.get("y").getAsDouble(),
                    "z", originalKeypoint1.get("z").getAsDouble() - originalKeypoint2.get("z").getAsDouble()
            );

            Map<String, Double> myVector = Map.of(
                    "x", myKeypoint1.get("x").getAsDouble() - myKeypoint2.get("x").getAsDouble(),
                    "y", myKeypoint1.get("y").getAsDouble() - myKeypoint2.get("y").getAsDouble(),
                    "z", myKeypoint1.get("z").getAsDouble() - myKeypoint2.get("z").getAsDouble()
            );

            double accuracy = (originalKeypoint1.get("score").getAsDouble() + originalKeypoint2.get("score").getAsDouble()) / 2;

            accuracySum += accuracy;

            // 벡터 정규화
            Map<String, Double> originalNorm = normalization(originalVector);
            Map<String, Double> myNorm = normalization(myVector);

            // 코사인 유사도 계산
            double result = cosineSimilarity(originalNorm, myNorm) * accuracy;
            sum += result;

        }

        double avg = sum / accuracySum;
        if (avg < 0)
            return 0;
        else
            return Math.round(avg * 100);
    }

    private double cosineSimilarity(Map<String, Double> originalNorm, Map<String, Double> myNorm) {
        if (originalNorm == null || myNorm == null) {
            throw new IllegalArgumentException("Vectors must not be null");
        }

        final Set<String> intersection = getIntersection(originalNorm, myNorm);

        final double dotProduct = dot(originalNorm, myNorm, intersection);

        double d1 = 0.0d;
        for (final Double value : originalNorm.values()) {
            d1 += Math.pow(value, 2);
        }
        double d2 = 0.0d;
        for (final Double value : myNorm.values()) {
            d2 += Math.pow(value, 2);
        }
        double cosineSimilarity;
        if (d1 <= 0.0 || d2 <= 0.0) {
            cosineSimilarity = 0.0;
        } else {
            cosineSimilarity = (double) (dotProduct / (double) (Math.sqrt(d1) * Math.sqrt(d2)));
        }
        return cosineSimilarity;
    }

    private Set<String> getIntersection(Map<String, Double> originalNorm, Map<String, Double> myNorm) {
        final Set<String> intersection = new HashSet<>(originalNorm.keySet());
        intersection.retainAll(myNorm.keySet());
        return intersection;
    }

    private double dot(Map<String, Double> originalNorm, Map<String, Double> myNorm, Set<String> intersection) {
        double dotProduct = 0;
        for (final String key : intersection) {
            dotProduct += originalNorm.get(key) * myNorm.get(key);
        }
        return dotProduct;
    }

    private Map<String, Double> normalization(Map<String, Double> vector) {
        double norm = Math.sqrt(vector.get("x") * vector.get("x") + vector.get("y") * vector.get("y") + vector.get("z") * vector.get("z"));
        return Map.of(
                "x", vector.get("x") / norm,
                "y", vector.get("y") / norm,
                "z", vector.get("z") / norm
        );
    }
}

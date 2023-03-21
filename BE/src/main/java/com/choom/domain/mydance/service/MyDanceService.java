package com.choom.domain.mydance.service;

import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Service
@Slf4j
public class MyDanceService {

    public String calculateSimilarity(Long originalDanceId, String myDanceCoordinate) throws ParseException {
        ArrayList<Double> matchRates = new ArrayList<Double>();

        /*
        coordinate에서 result를 가져오는 code
        String originalDanceJsonFile = originalDanceService.findById(originalDanceId);
         */

        // 현재는 그냥 더미 데이터로 테스트
        String originalDanceCoordinate = "";

        // String -> Object
        JSONParser parser = new JSONParser();
        Object originalObj = parser.parse(originalDanceCoordinate);
        Object myObj = parser.parse(myDanceCoordinate);

        // Object -> JSONArray
        JSONArray originalResult = (JSONArray) originalObj;
        JSONArray myResult = (JSONArray) myObj;

        // JSONArray에서 하나씩 처리
        if (myResult.size() > 0) {
            // 내 챌린지 영상 frame 개수만큼 반복
            // 원본 영상보다 내 챌린지 영상이 긴 경우는 없다고 가정
            for (int i = 0; i < myResult.size(); i++) {
                JSONObject originalFrameObj = (JSONObject) originalResult.get(i);
                JSONObject myFrameObj = (JSONObject) myResult.get(i);

                // keypoints 배열
                JSONArray originalKeypoints = (JSONArray) originalFrameObj.get("keypoints");
                JSONArray myKeypoints = (JSONArray) myFrameObj.get("keypoints");

                double similarity = calculate(originalKeypoints, myKeypoints);

                matchRates.add(similarity);

            }
        }
        return matchRates.toString();
    }

    private double calculate(JSONArray originalKeypoints, JSONArray myKeypoints) {
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
            JSONObject originalKeypoint1 = (JSONObject) originalKeypoints.get(joint[0]);
            JSONObject originalKeypoint2 = (JSONObject) originalKeypoints.get(joint[1]);

            JSONObject myKeypoint1 = (JSONObject) myKeypoints.get(joint[0]);
            JSONObject myKeypoint2 = (JSONObject) myKeypoints.get(joint[1]);

            Map<String, Double> originalVector = Map.of(
                    "x", (double) originalKeypoint1.get("x") - (double) originalKeypoint2.get("x"),
                    "y", (double) originalKeypoint1.get("y") - (double) originalKeypoint2.get("y"),
                    "z", (double) originalKeypoint1.get("z") - (double) originalKeypoint2.get("z")
            );

            Map<String, Double> myVector = Map.of(
                    "x", (double) myKeypoint1.get("x") - (double) myKeypoint2.get("x"),
                    "y", (double) myKeypoint1.get("y") - (double) myKeypoint2.get("y"),
                    "z", (double) myKeypoint1.get("z") - (double) myKeypoint2.get("z")
            );

            double accuracy = ((double) originalKeypoint1.get("score") + (double) originalKeypoint2.get("score")) / 2;

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

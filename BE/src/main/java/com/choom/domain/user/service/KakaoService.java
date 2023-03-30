package com.choom.domain.user.service;

import com.choom.domain.user.dto.SocialUserInfoDto;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;



@Slf4j
@Service
public class KakaoService {
    private static String KAKAO_APIKEY;
    private static String KAKAO_REDIRECT_URI;

    @Value("${apikey.kakao}")
    public void setKakaoApikey(String value){
        KAKAO_APIKEY = value;
    }

    @Value("${redirect-uri.kakao}")
    public void setKakaoRedirectUri(String value){
        KAKAO_REDIRECT_URI = value;
    }

    public SocialUserInfoDto getUserInfo(String code) {
        String accessToken = getAccessToken(code);
        log.info("카카오 accessToken : " + accessToken);
        return getUserInfoByToken(accessToken);
    }

    private String getAccessToken(String code) {
        log.info("인가 코드 : " + code);
        log.info("리다이렉트 주소 : " + KAKAO_REDIRECT_URI);

        String access_Token="";
        String refresh_Token ="";
        String reqURL = "https://kauth.kakao.com/oauth/token";

        try{
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            //POST 요청을 위해 기본값이 false인 setDoOutput을 true로
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            //POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=authorization_code");
            sb.append("&client_id=" + KAKAO_APIKEY);
            sb.append("&redirect_uri=" + KAKAO_REDIRECT_URI);
            sb.append("&code=" + code);
            bw.write(sb.toString());
            bw.flush();

            //결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();

            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }

            //Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            access_Token = element.getAsJsonObject().get("access_token").getAsString();
            refresh_Token = element.getAsJsonObject().get("refresh_token").getAsString();

            br.close();
            bw.close();
        }catch (IOException e) {
            e.printStackTrace();
        }

        return access_Token;
    }

    public SocialUserInfoDto getUserInfoByToken(String accessToken){

        String reqURL = "https://kapi.kakao.com/v2/user/me";

        //access_token을 이용하여 사용자 정보 조회
        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setDoOutput(true);
            conn.setRequestProperty("Authorization", "Bearer " + accessToken); //전송할 header 작성, access_token전송

            //결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();

            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            log.info("response body : " + result);

            //Gson 라이브러리로 JSON 파싱
            JsonParser jsonParser = new JsonParser();
            JsonElement jsonElement = jsonParser.parse(result);
            JsonObject jsonObject = jsonElement.getAsJsonObject();

            String identifier = jsonElement.getAsJsonObject().get("id").getAsString();
            JsonObject properties = jsonObject.get("properties").getAsJsonObject();
            String nickname = properties.get("nickname").getAsString();
            String profileImage = properties.get("profile_image").getAsString();

            log.info("identifier : " + identifier);

            br.close();

            return new SocialUserInfoDto(identifier, nickname, profileImage);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}

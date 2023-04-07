#  🐯🐤🦈BACKEND 🐶🐱🦄

## **📚목차** 

- 사용 기술
- 설치 방법
- 디렉토리 구조
- 컨벤션과 코딩 규칙

<br>

## ****💻 사용 기술****

| 사용 기술 | 버전 |
| --- | --- |
| AWS EC2 | ubuntu 20.04 |
| IntelliJ | IDEA 2022.3.1 |
| SpringBoot | 2.7.9 |
| JDK | OpenJDK 11.0.17 |
| MySQL | 8.0.32 |
| Redis | 7.0.10 |

<br>

## ****🛠️ 설치 방법****

1. OpenJDK 설치
    1. JDK 다운로드 사이트에서 1.8.x 설치 파일 다운로드 및 실행
        - [Zulu OpenJDK](https://www.azul.com/downloads/?version=java-8-lts&package=jdk)
        - [OJDK Build](https://github.com/ojdkbuild/ojdkbuild)
    2. 설치 후 명령 프롬프트(cmd) 확인
        
        ```
        > java -version
        ```
        
2. 프로젝트 다운로드 및 실행
    1. 프로젝트 다운로드
        
        ```
        git clone [https://lab.ssafy.com/s08-ai-image-sub2/S08P22A501.git](https://lab.ssafy.com/s08-ai-image-sub2/S08P22A501.git)
        ```
        
    2. 포팅 메뉴얼을 따라서 실행

<br>

## ****📁 디렉토리 구조****

```
.
│
├─main
│  ├─java
│  │  └─com
│  │      └─choom
│  │          │  ChoomApplication.java
│  │          │
│  │          ├─domain
│  │          │  ├─bookmark
│  │          │  │  ├─controller
│  │          │  │  │      BookmarkController.java
│  │          │  │  │
│  │          │  │  ├─dto
│  │          │  │  │      BookmarkDetailsDto.java
│  │          │  │  │
│  │          │  │  ├─entity
│  │          │  │  │      Bookmark.java
│  │          │  │  │      BookmarkRepository.java
│  │          │  │  │
│  │          │  │  └─service
│  │          │  │          BookmarkService.java
│  │          │  │
│  │          │  ├─dance
│  │          │  │  ├─controller
│  │          │  │  │      DanceController.java
│  │          │  │  │
│  │          │  │  ├─dto
│  │          │  │  │      AddDanceResponseDto.java
│  │          │  │  │      DanceDetailsDto.java
│  │          │  │  │      DanceDetailsWithRankDto.java
│  │          │  │  │      DanceRankUserDto.java
│  │          │  │  │      DanceSearchDto.java
│  │          │  │  │      DanceStatusDto.java
│  │          │  │  │      PopularDanceDto.java
│  │          │  │  │
│  │          │  │  ├─entity
│  │          │  │  │      Dance.java
│  │          │  │  │      DanceCustomRepository.java
│  │          │  │  │      DanceCustomRepositoryImpl.java
│  │          │  │  │      DanceRepository.java
│  │          │  │  │
│  │          │  │  └─service
│  │          │  │          DanceService.java
│  │          │  │
│  │          │  ├─mydance
│  │          │  │  ├─controller
│  │          │  │  │      MyDanceController.java
│  │          │  │  │
│  │          │  │  ├─dto
│  │          │  │  │      AddMyDanceRequestDto.java
│  │          │  │  │      AddMyDanceResponseDto.java
│  │          │  │  │      AddShortsResponseDto.java
│  │          │  │  │      FindMyDanceResponseDto.java
│  │          │  │  │      ModifyMyDanceRequestDto.java
│  │          │  │  │
│  │          │  │  ├─entity
│  │          │  │  │      MyDance.java
│  │          │  │  │      MyDanceCustomRepository.java
│  │          │  │  │      MyDanceCustomRepositoryImpl.java
│  │          │  │  │      MyDanceRepository.java
│  │          │  │  │
│  │          │  │  └─service
│  │          │  │          MyDanceService.java
│  │          │  │
│  │          │  ├─search
│  │          │  │  ├─controller
│  │          │  │  │      SearchController.java
│  │          │  │  │
│  │          │  │  ├─dto
│  │          │  │  │      AddSearchRequestDto.java
│  │          │  │  │      SearchResponseDto.java
│  │          │  │  │
│  │          │  │  ├─entity
│  │          │  │  │      Search.java
│  │          │  │  │      SearchRepository.java
│  │          │  │  │
│  │          │  │  └─service
│  │          │  │          SearchService.java
│  │          │  │
│  │          │  └─user
│  │          │      ├─controller
│  │          │      │      UserController.java
│  │          │      │
│  │          │      ├─dto
│  │          │      │      AccessTokenDto.java
│  │          │      │      SocialUserInfoDto.java
│  │          │      │      TokenDto.java
│  │          │      │      UserDetailsDto.java
│  │          │      │      UserMyDanceDto.java
│  │          │      │
│  │          │      ├─entity
│  │          │      │      Blacklist.java
│  │          │      │      BlacklistRedisRepository.java
│  │          │      │      RefreshToken.java
│  │          │      │      RefreshTokenRedisRepository.java
│  │          │      │      SocialType.java
│  │          │      │      User.java
│  │          │      │      UserRepository.java
│  │          │      │
│  │          │      └─service
│  │          │              AuthService.java
│  │          │              RedisService.java
│  │          │              UserService.java
│  │          │
│  │          └─global
│  │              ├─auth
│  │              │      CustomUserDetails.java
│  │              │      CustomUserDetailService.java
│  │              │      JwtAuthenticationFilter.java
│  │              │
│  │              ├─config
│  │              │      AsyncConfig.java
│  │              │      FeignClientConfig.java
│  │              │      QuerydslConfig.java
│  │              │      SecurityConfig.java
│  │              │      SwaggerConfig.java
│  │              │      Workaround.java
│  │              │
│  │              ├─exception
│  │              │      FileDeleteException.java
│  │              │      GlobalExceptionHandler.java
│  │              │      SearchKeywordException.java
│  │              │
│  │              ├─model
│  │              │      BaseResponse.java
│  │              │      BaseTimeEntity.java
│  │              │      ErrorResponse.java
│  │              │      GoogleUserInfoResponse.java
│  │              │      KakaoUserInfoResponse.java
│  │              │      SocialAccessTokenResponse.java
│  │              │
│  │              ├─service
│  │              │      FileService.java
│  │              │      GoogleAccessTokenService.java
│  │              │      GoogleService.java
│  │              │      GoogleUserInfoService.java
│  │              │      KakaoAccessTokenService.java
│  │              │      KakaoService.java
│  │              │      KakaoUserInfoService.java
│  │              │      RandomNicknameService.java
│  │              │      VideoService.java
│  │              │      YoutubeService.java
│  │              │
│  │              └─util
│  │                      JwtTokenUtil.java
│  │                      ResponseBodyWriteUtil.java
│  │
│  └─resources
│          .gitkeep
│          application-aws.yml
│          application-local.yml
```

<br>

## 🚧 컨벤션과 코딩 규칙

### JAVA 컨벤션

---


```
💡 [https://naver.github.io/hackday-conventions-java/](https://naver.github.io/hackday-conventions-java/)
자바 컨벤션은 네이버 캠퍼스 핵데이 JAVA 코딩 컨벤션을 따릅니다.
```


### 스프링 기본 컨벤션

---

1. Controller

    컨트롤러 클래스 내에서 메서드 명을 작성할 때는 아래와 같은 접미사를 붙인다.

    orderList() – 목록 조회 유형의 서비스

    orderDetails() – 단 건 상세 조회 유형의 controller 메서드

    saveOrder() – 등록/수정/삭제 가 동시에 일어나는 유형의 controller 메서드

    addOrder() – 등록만 하는 유형의 controller 메서드

    modifyOrder() – 수정만 하는 유형의 controller 메서드

    removeOrder() – 삭제만 하는 유형의 controller 메서드

2. Service

    서비스 클래스 안에서 메서드 명을 작성 할 때는 아래와 같은 접두사를 붙인다.

    findOrder() - 조회 유형의 service 메서드

    addOrder() - 등록 유형의 service 메서드

    modifyOrder() - 변경 유형의 service 메서드

    removeOrder() - 삭제 유형의 service 메서드

    saveOrder() – 등록/수정/삭제 가 동시에 일어나는 유형의 service 메서드

### 코딩 규칙

---

1. 변수와 함수명은 의미를 잘 전달하도록 명확하게 작성한다.

2. 코드는 기능 단위로 분할하여 작성한다.

3. 중복 코드를 최소화한다.

4. 커밋은 기능 단위로 자주 한다.

5. 에러가 발생하지 않고 기능이 구현 된 이후에 커밋한다.

6. 코드 리뷰는 꼼꼼하게 한다.

7. 주석이 필요한 부분은 깔끔하게 작성한다.

8. Pull Request & Merge Request를 작성할 때는 변경 사항을 자세히 설명한다.

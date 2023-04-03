import { axiosInstance, axiosFileInstance } from "./instance";

// 챌린지 분석 상태 확인 및 변경
export const getChallengeStatus = async (danceId: string) => {
  const response = await axiosInstance.put("/dance/" + danceId + "/status");
  return response.data;
};

// 챌린지 분석 결과 저장
export const updateChallenge = async (danceId: string, jsonFile: File) => {
  const response = await axiosFileInstance.put("/dance/" + danceId, {
    jsonFile: jsonFile,
  });
  return response.data;
};

// 내가 춘 춤 결과 저장
export const createChallengeResult = async (formData: FormData) => {
  const response = await axiosFileInstance.post("/mydance", formData);
  return response.data;
};

// 내가 춘 춤 목록 받기
export const getMyDanceList = async (
  page: number,
  size: number,
  sort: "score,desc" | "score,asc" | "createdAt,desc" | "createdAt,asc"
) => {
  const response = await axiosInstance.get(
    `/mydance?page=${page}&size=${size}&sort=${sort}`
  );
  return response.data;
};

// 챌린지 유튜브 포스팅
export const postingChallenge = async (danceId: string) => {
  const response = await axiosInstance.put(
    "/mydance/" +
      danceId +
      "/shorts?code=https://accounts.google.com/o/oauth2/auth?client_id=478547859062-ji67ae1smq25s6nnktcoqnj1eom8kgm2.apps.googleusercontent.com&redirect_uri=https://j8a501.p.ssafy.io/upload&response_type=code&scope=https://www.googleapis.com/auth/youtube.upload](https://accounts.google.com/o/oauth2/auth?client_id=478547859062-ji67ae1smq25s6nnktcoqnj1eom8kgm2.apps.googleusercontent.com&redirect_uri=https://j8a501.p.ssafy.io/upload&response_type=code&scope=https://www.googleapis.com/auth/youtube.upload",
    {}
  );
  return response.data;
};

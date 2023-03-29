import { axiosInstance, axiosFileInstance } from "./instance";

// 챌린지 분석 상태 확인 및 변경
export const getChallengeStatus = async (danceId: string) => {
  const response = await axiosInstance.put("/dance/" + danceId + "/status");
  return response.data;
};

// 챌린지 분석 결과 저장
export const updateChallenge = async (danceId: string, jsonFile: FormData) => {
  const response = await axiosFileInstance.put("/dance/" + danceId, jsonFile);
  return response.data;
};

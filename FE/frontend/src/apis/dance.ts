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
  console.log(formData);
  console.log(formData.get("addMyDanceRequestDto"));
  console.log(formData.get("videoFile"));
  const response = await axiosFileInstance.post("/mydance", formData);
  return response.data;
};

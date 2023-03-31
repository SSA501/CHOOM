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

// 내가 춘 춤 상세보기
export const getMyDanceDetail = async (danceId: number) => {
  const response = await axiosFileInstance.get(`/mydance/${danceId}`);
  return response.data;
};

// 내가 춘 춤 삭제하기
export const removeMyDance = async (danceId: number) => {
  const response = await axiosFileInstance.delete(`/mydance/${danceId}`);
  return response.data;
};

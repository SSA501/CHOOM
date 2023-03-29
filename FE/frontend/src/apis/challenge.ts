import { axiosInstance } from "./instance";

// 인기 챌린지 받아오기
export const getPopularChallenge = async () => {
  const response = await axiosInstance.get("/dance/popular");
  return response.data;
};

// 챌린지 상세 받아오기
export const getChallengeDetail = async (danceId: string) => {
  const response = await axiosInstance.get(`/dance/${danceId}`);
  return response.data;
};

// 챌린지 제목 수정하기
export const updateChallengeTitle = async () => {
  const response = await axiosInstance.post("");
  return response.data;
};

// 검색하기

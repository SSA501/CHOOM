import { axiosInstance } from "./instance";

// 인기 챌린지 받아오기
export const getPopularChallenge = async () => {
  const response = await axiosInstance.get("/dance/popular");
  return response.data;
};

// 챌린지 제목 수정하기
export const updateChallengeTitle = async () => {
  const response = await axiosInstance.post("");
};

// 검색하기

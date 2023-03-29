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

// 검색 키워드 목록 받아오기
export const getSearchKeywordList = async () => {
  const response = await axiosInstance.get("/search");
  return response.data;
};

// 검색 키워드 추가하기
export const addSearchKeyword = async (keyword: string) => {
  const response = await axiosInstance.post("/search", { keyword });
  return response.data;
};

// 검색 키워드 삭제하기
export const removeSearchKeyword = async (searchId: number) => {
  const response = await axiosInstance.delete(`/search/${searchId}`);
  return response.data;
};

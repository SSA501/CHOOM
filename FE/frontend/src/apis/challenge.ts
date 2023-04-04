import { axiosInstance } from "./instance";

// 인기 챌린지 받아오기
export const getPopularChallenge = async () => {
  const response = await axiosInstance.get("/dance/popular", {
    headers: {
      Authorization: "",
    },
  });
  return response.data;
};

// 챌린지 상세 받아오기
export const getChallengeDetail = async (danceId: string) => {
  const response = await axiosInstance.get(`/dance/${danceId}`);
  return response.data;
};

// 챌린지 제목 수정하기
export const updateChallengeTitle = async (danceId: string, title: string) => {
  const response = await axiosInstance.put(`mydance/${danceId}/title`, {
    title: title,
  });
  return response.data;
};

// 검색하기
export const searchDance = async (query: string, size: number) => {
  const response = await axiosInstance.get("/dance", {
    params: {
      keyword: query,
      size: size,
    },
  });
  return response.data;
};

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

// 검색 쇼츠 저장요청하고 id 받아오기
export const addDance = async (youtubeId: any) => {
  const response = await axiosInstance.post(`/dance/${youtubeId}`);
  return response.data;
};

// 즐겨찾기 추가
export const addBookmark = async (danceId: number) => {
  const response = await axiosInstance.post(`/bookmark/${danceId}`);
  return response.data;
};

// 즐겨찾기 삭제
export const removeBookmark = async (danceId: number) => {
  const response = await axiosInstance.delete(`/bookmark/${danceId}`);
  return response.data;
};

// 즐겨찾기 목록 받기
export const getBookmarkList = async (
  page: number,
  size: number,
  sort: "score,desc" | "score,asc" | "createdAt,desc" | "createdAt,asc"
) => {
  const response = await axiosInstance.get(
    `/bookmark?page=${page}&size=${size}&sort=${sort}`
  );
  return response.data;
};

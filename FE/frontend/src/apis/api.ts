import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://j8a501.p.ssafy.io/api",
  // baseURL: "http://localhost:8080/api",
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
});

// 카카오 코드 받기 위해 리다이렉트
export const redirectKakao = () => {
  // 카카오 로그인 주소
  const CLIENT_ID = "113e58b998f18be80dd79db4ef86fee2";
  const REDIRECT_URI = "http://localhost:3000/login/oauth2/kakao";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  window.location.href = KAKAO_AUTH_URL;
};

// 카카오 로그인
export const loginKakao = async (code: string) => {
  const res = await axiosInstance.get<any>(`/user/login/kakao?code=${code}`);
  return res.data;
};

// 로그아웃
export const logout = async () => {
  await axiosInstance.post<any>(`/user/logout`);
};

// 탈퇴하기
export const withdraw = async () => {
  await axiosInstance.delete<any>(`/user`);
};

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

import { SERVER_URL } from "../constants/url";
import { axiosFileInstance, axiosInstance } from "./instance";

// 카카오 로그인 리다이렉트
export const redirectKakao = () => {
  const CLIENT_ID = "113e58b998f18be80dd79db4ef86fee2";
  const REDIRECT_URI = "http://localhost:3000/login/oauth2/kakao";
  // const REDIRECT_URI = `${SERVER_URL}/login/oauth2/kakao`;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  window.location.href = KAKAO_AUTH_URL;
};

// 구글 로그인 리다이렉트
export const redirectGoogle = () => {
  const CLIENT_ID =
    "124626006679-cq05a5rj2anbrqtfcvv1bjtriqs2pjul.apps.googleusercontent.com";
  const REDIRECT_URI = `${SERVER_URL}/login/oauth2/google`;
  const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&service=lso&o2v=1&flowName=GeneralOAuthFlow`;
  // const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?client_id=${CLIENT_ID}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin%2Foauth2%2Fgoogle&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&service=lso&o2v=1&flowName=GeneralOAuthFlow`;
  window.location.href = GOOGLE_AUTH_URL;
};

// 카카오 로그인
export const loginKakao = async (code: string) => {
  const res = await axiosInstance.get<any>(`/user/login/kakao?code=${code}`);
  return res.data;
};

// 구글 로그인
export const loginGoogle = async (code: string) => {
  const res = await axiosInstance.get<any>(`/user/login/google?code=${code}`);
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

// accessToken 토큰 갱신
export const reissueToken = async () => {
  const res = await axiosInstance.post<any>(`/user/login/token`);
  return res.data;
};

// 회원 정보 받기
export const getUserDetail = async () => {
  const res = await axiosInstance.get("/user");
  return res.data;
};

// 닉네임 중복 검사
export const checkNickname = async (nickname: string) => {
  const res = await axiosInstance.get(`/user/nickname/${nickname}`);
  return res.data;
};

// 회원 정보 수정
export const updateUserDetail = async (formData: FormData) => {
  const res = await axiosFileInstance.put("/user", formData);
  return res.data;
};

import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function KakaoRedirectPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  let kakaoCode = searchParams.get("code");
  // let kakaoCode = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    console.log(kakaoCode);
    // TODO: 백엔드에 코드 전달
  }, [kakaoCode]);

  return (
    <div>
      <div>카카오 로그인 중입니다...</div>
    </div>
  );
}

export default KakaoRedirectPage;

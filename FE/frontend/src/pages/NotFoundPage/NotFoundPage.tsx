import React, { useEffect } from "react";
import { NotFoundPageContainer } from "./style";

function NotFoundPage() {
  useEffect(() => {
    const htmlTitle = document.querySelector("title");
    htmlTitle!.innerHTML = "잘못된 접근 - CHOOM";
  }, []);

  return <NotFoundPageContainer>잘못된 경로입니다 ㅠㅠ</NotFoundPageContainer>;
}

export default NotFoundPage;

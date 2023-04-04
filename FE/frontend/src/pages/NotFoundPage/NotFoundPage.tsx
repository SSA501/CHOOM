import React, { useEffect } from "react";
import { NotFoundPageContainer } from "./style";

function NotFoundPage() {
  useEffect(() => {
    const htmlTitle = document.querySelector("title");
    htmlTitle!.innerHTML = "잘못된 접근 - CHOOM";
  }, []);

  return (
    <NotFoundPageContainer>
      <div>
        <img
          src="https://media.tenor.com/gu-vfNJjUM4AAAAM/yes-love.gif"
          alt="춤추는 아기"
        />
      </div>
      <p>잘못된 경로입니다 😅</p>
    </NotFoundPageContainer>
  );
}

export default NotFoundPage;

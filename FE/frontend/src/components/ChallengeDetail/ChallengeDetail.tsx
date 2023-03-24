import React from "react";
import { ChallengeDetailContainer, DetailTitle } from "./style";

interface ChallengeDetailProps {
  title: string;
  children: React.ReactNode;
}

function ChallengeDetail({ title, children }: ChallengeDetailProps) {
  return (
    <ChallengeDetailContainer>
      <DetailTitle>{title}</DetailTitle>
      {children}
    </ChallengeDetailContainer>
  );
}

export default ChallengeDetail;

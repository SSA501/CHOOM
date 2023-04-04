import { TitleContainer, TitleBar, TitleText } from "./style";

function SideSubTitle(props: {
  title: string;
  contents: { icon: string; text: string }[];
}) {
  return (
    <TitleContainer>
      <TitleText>{props.title}</TitleText>
      <TitleBar />
      {props.contents.map((content, i) => {
        return (
          <TitleText key={i}>
            <div>{content.icon}</div>
            <div>{content.text}</div>
          </TitleText>
        );
      })}
    </TitleContainer>
  );
}

export default SideSubTitle;

import { TitleContainer, TitleBar, TitleText } from "./style";
function SideTitle(props: { title: string[]; marginTop?: string }) {
  return (
    <TitleContainer marginTop={props.marginTop}>
      <TitleBar />
      <TitleText>
        {props.title[0]}
        <br />
        {props.title[1]}
      </TitleText>
    </TitleContainer>
  );
}

export default SideTitle;

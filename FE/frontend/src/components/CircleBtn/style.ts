import styled from "styled-components";

const Btn = styled.button`
  position: relative;
  border: none;
  border-radius: 2rem;
  width: 60px;
  height: 60px;
  border: 2px solid var(--purple-color);
  background-color: var(--white-color);
  color: var(--purple-color);
  font-size: 20px;
  margin-top: 20px;
  line-height: 10px;
  cursor: pointer;

  & > svg {
    font-size: 28px;
  }
  &:hover {
    background-color: var(--purple-color);
    color: var(--white-color);
  }
  &:disabled {
    cursor: not-allowed;
    border: 2px solid #999999;
    background-color: #cccccc;
    color: #666666;
  }
`;

const BtnLabel = styled.div<{ disabled?: string }>`
  text-align: center;
  color: ${(props) =>
    props.disabled === "disabled" ? "#666666" : "var(--darkgray-color)"};
  font-size: 16px;
  margin-top: 12px;
`;

export { Btn, BtnLabel };

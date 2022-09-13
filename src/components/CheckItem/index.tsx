import * as React from 'react';
import styled from "styled-components"

interface ICheckItem {
  pass: boolean;
  text?: string;
}

const Container = styled.div`
  display: flex;
`

const Tick = styled.div`
  position: relative;
  display: inline-block;
  width: 15px;
  height: 15px;
  margin-right: 10px;
  &:before {
    position: absolute;
    left: 0;
    top: 50%;
    height: 50%;
    width: 3px;
    background-color: #218838;
    content: "";
    transform: translateX(10px) rotate(-45deg);
    transform-origin: left bottom;
  }

  &:after {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 3px;
    width: 100%;
    background-color: #218838;
    content: "";
    transform: translateX(10px) rotate(-45deg);
    transform-origin: left bottom;
  }
` 

const Text = styled.div<ICheckItem>`
  display: flex;
  color: ${(props: ICheckItem) => props.pass ? '#218838' : '#e92910'};
`


export const CheckItem: React.FC<ICheckItem> = ({
  pass,
  text
}: ICheckItem): JSX.Element => {
  return (
    <Container data-testid="checkItem">
      {pass && <Tick />}
      <Text pass={pass}>{text}</Text>
    </Container>
  )
}

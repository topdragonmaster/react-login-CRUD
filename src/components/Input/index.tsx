import * as React from 'react';
import styled from "styled-components"

interface IInput {
  title: string;
  required: boolean;
  message?: string | boolean;
  messageContent?: JSX.Element
  placeHolder?: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`
const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 3px;
`

const StyledInput = styled.input`
  background-color: #ffffff;
  padding: 6px;
  width: 100%;
  margin-bottom: 3px;
  font-size: 20px;
`

const Title = styled.p`
  font-size: 18px;
  color: black;
`

const RedText = styled.p`
  font-size: 14px;
  color: #e45947;
`

export const Input: React.FC<IInput> = ({
  title,
  required,
  message,
  placeHolder,
  name,
  onChange,
  messageContent,
}: IInput): JSX.Element => {
  return (
    <Container data-testid="input">
      <TitleContainer>
        <Title>{`${title}:`}</Title>
        {required && <RedText>*</RedText>}
      </TitleContainer>
      <StyledInput name={name} onChange={onChange} placeholder={placeHolder}></StyledInput>
      {message && <RedText>{message}</RedText>}
      {messageContent}
    </Container>
  )
}

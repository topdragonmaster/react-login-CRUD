import React, { useState } from "react";

import {
  Section,
  Container,
  Title,
  Content,
  Footer,
  MessageContiner,
} from "./style"
import { Button, Text, Input, CheckItem } from '../../components'
import { IPassword } from "../../types";

interface IProps {
  onLogin: (e:boolean) => void
}

const emailC = 'james@gmail.com'
const passwordC = 'React!12'

function Login({onLogin}: IProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailValid, setEmailValid] = useState('')
  const [passwordMessage, setPasswordMessage] = useState('')

  const [passwordValid, setPasswordValid] = useState<IPassword>({
    upperCase: false,
    lowerCase: false,
    number: false,
    specialChr: false,
    length: false
  })

  const handleSubmit = (event:  React.SyntheticEvent) => {
    event.preventDefault()
    const {upperCase, lowerCase, number, specialChr, length} = passwordValid
    if (validEmail() && upperCase && lowerCase && number && specialChr && length) {
      if (email === emailC && password === passwordC) {
        onLogin(true)
      } else {
        if (email !== emailC) {
          setEmail('wrong email')
        }
        if (password !== passwordC) {
          setPasswordMessage('wrong password')
        }
      }
    } 
  }

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'email') {
      setEmail(event.target.value)
    }
    if (event.target.name === 'password') {
      setPassword(event.target.value)
      validPassword(event.target.value)
    }    
  }

  const validEmail = () => {
    let isValid = false
    if (!email) {
        isValid = false;
        setEmailValid("Please enter your email.")  
    } else {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(email)) {
          isValid = false;
          setEmailValid("Please enter valid email address.")
        } else {
          setEmailValid('')
          isValid = true
        }
    }
    return isValid
  }

  const validPassword = (str: string) => {
    const length = str.length >= 6
    const number = /(?=.*[0-9])/g.test(str)
    const upperCase = /(?=.*[A-Z])/g.test(str)
    const lowerCase = /(?=.*[a-z])/g.test(str)
    const specialChr = /(?=.*\W)/g.test(str)

    setPasswordValid({
      upperCase,
      lowerCase,
      number,
      specialChr,
      length
    })
  }

  const messageContent = <MessageContiner>
    <CheckItem pass={passwordValid.upperCase} text="At least one upper letter" />
    <CheckItem pass={passwordValid.lowerCase} text="At least one lower letter" />
    <CheckItem pass={passwordValid.number} text="At least one digit" />
    <CheckItem pass={passwordValid.specialChr} text="At least one special character" />
    <CheckItem pass={passwordValid.length} text="Minimum 6 in length" />
  </MessageContiner>;

  return (
    <Section data-testid="container">
      <Container onSubmit={handleSubmit}>
        <Title>MoCaFi</Title>
        <Text color="black" fontSize={30} style={{marginBottom: '10px'}}> LogIn </Text>
        <Content>
          <Input
            name="email"
            onChange={handleChange}
            title="email"
            required={true}
            placeHolder="james@gmail.com"
            message={emailValid}
          />

          <Input
            name="password"
            onChange={handleChange}
            title="password"
            required={true}
            placeHolder="React!12"
            message={passwordMessage}
            messageContent={messageContent}
          />
        </Content>
        <Footer>
          <Button type="submit">login</Button>
          <Button>cancel</Button>
        </Footer>
      </Container>
    </Section>
  );
}

export default Login;
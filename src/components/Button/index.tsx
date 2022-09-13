import styled, { css } from 'styled-components'

interface IButton {
  disabled?: boolean
}

export const Button = styled.button<IButton>`
  cursor: pointer;
  background: #28a745;
  border: 2px solid #28a745;
  color: white;
  width: auto;
  font-size: 16px;
  padding: 3px 20px;
  margin-bottom: 5px;
  border-radius: 5px;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  ${(props) => {
    if (props.disabled)
      return css`
        opacity: 0.5;
      `
    else
      return css`
        &:hover {
          color: #fff;
          background-color: #218838;
          border-color: #1e7e34;
          transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
        }
      `
  }}
`

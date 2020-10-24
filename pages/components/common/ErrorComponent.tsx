import { ReactElement } from 'react'
import styled from 'styled-components'
interface ErrorComponentSchema{
    errMsg :  string;
    children?:ReactElement
}
export default function ErrorComponent({errMsg,children} :ErrorComponentSchema ) {
  return (
      <ErrorComponentWrapper>
       {errMsg && <p>{errMsg}</p>}
       {children}
      </ErrorComponentWrapper>
    
  )
}

const ErrorComponentWrapper = styled.div`
    width:100%;
    min-height:400px;
    display:flex;
    justify-content:center;
    align-items:center;

`
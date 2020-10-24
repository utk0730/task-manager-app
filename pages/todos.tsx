import styled from 'styled-components'
import Layout from './components/common/Layout'

export default function Home() {
  return <Layout>
        <Container>
        <div>
          <ul>
              <li><span>Typescript</span> : More repetitive typescript schemas to a separate module.</li>
              <li><span>Pagintaion</span>: Pagination needs more logic to handle all edge cases.</li>
              <li><span>ESLint</span> : Some eslint scripts in package json file to check eslint warning and errors.</li>
          </ul>
        </div>
        </Container>
          
      </Layout>
   
}


const Container = styled.div`
  height:600px;
  display:flex;
  justify-content:center;
  align-items:center;
  & > div{
  color: blue;
  font-size: 24px;
  margin:auto;
  border:1px solid blue;
  padding:4rem;
  &  ul {
      padding:0;
      & > li{
          display:block;
          padding:5px 0rem;
      }
  }
  @media (max-width: 767px) {
    padding:5px;
    font-size:14px;
    height:400px;
    }
  }
`

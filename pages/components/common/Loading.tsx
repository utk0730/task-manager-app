import styled from "styled-components"
import Loader from 'react-loader-spinner'
const Loading = () => (
    <StyledLoader>
        <Loader
         type="ThreeDots"
         color="#0D19A3"
      />
    </StyledLoader>
)


export default Loading

const StyledLoader = styled.div`
height:100vh;
display:flex;
justify-content:center;
align-items:center;
background:${({ theme }) => theme.colors.white};
`
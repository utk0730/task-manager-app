import styled from 'styled-components'
import Header from '../common/Header'
interface LayoutSchema {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutSchema) {
  return (
    <div>
      <Header />
      <PageContentWrapper>{children}</PageContentWrapper>
    </div>
  )
}

const PageContentWrapper = styled.div`
  max-width: ${({ theme }) => theme.width.max};
  margin: auto;
  @media (max-width: 767px) {
    padding: 0rem 1rem;
  }
`

import styled from 'styled-components'
import Link from 'next/link'
export default function Header() {
  return (
    <HeaderWrapper>
      <div>
        <Link href="/">
          <div className="brand">
            <img src="/assets/images/brand-logo.png" />
            <p>TaskBoard</p>
          </div>
        </Link>

        <ul>
        <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/contributors">Contributors</Link>
          </li>
          <li>
            <Link href="/todos">Todos</Link>
          </li>
          <li>
            <a target="_blank" href="https://github.com/utk0730/task-manager-app">
              Github Link
            </a>
          </li>
        </ul>
      </div>
    </HeaderWrapper>
  )
}

const HeaderWrapper = styled.div`
  height: 80px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  @media (max-width: 767px) {
    height: auto;
  }
  & > div {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: auto;
    max-width: ${({ theme }) => theme.width.max};
    @media (max-width: 767px) {
      flex-direction: column;
      padding: 1rem 0;
    }
    & .brand {
      display: flex;
      align-items: center;
      font-size: ${({ theme }) => theme.fontSize['4xl']};
      font-weight: 600;
      letter-spacing: 2px;
      cursor: pointer;
      & > img {
        width: 70px;
        height: 70px;
        margin-right: 10px;
      }
    }
    & > ul {
      list-style: none;
      height: 100%;
      display: flex;
      font-size: ${({ theme }) => theme.fontSize.lg};
      @media (max-width: 767px) {
        padding-left: 0;
      }
      & > li {
        & > a {
          display: block;
          padding: 2rem 1rem;
          @media (max-width: 767px) {
            padding: 0.5rem;
          }
        }
      }
    }
  }
`

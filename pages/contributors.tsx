import Head from 'next/head'
import { useEffect, useState } from 'react'
import Loading from './components/common/Loading'
import Layout from './components/common/Layout'
import axios from 'axios'
import styled from 'styled-components'

export default function Home() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  const getUserList = async () => {
    try {
      setLoading(true)
      const _result = await axios.get('/api/fetchUsers')
      const {
        data: { status, users },
      } = _result
      if (status == 'success') {
        setUsers(users)
        setLoading(false)
      } else {
        setUsers([])
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    getUserList()
  }, [])

  return (
    <Layout>
      <div>
        <Head>
          <title>Devza - Task Contributors</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {loading ? (
          <Loading />
        ) : (
          <ContributorsWrapper>
            <h1>Devza Contributors</h1>
            <div>
              {users.map((_o) => {
                const { name, picture, id } = _o
                return (
                  <div key={id}>
                    <img src={picture} alt="" />
                    <p>{name}</p>
                  </div>
                )
              })}
            </div>
          </ContributorsWrapper>
        )}
      </div>
    </Layout>
  )
}

const ContributorsWrapper = styled.div`
  padding: 3rem 4rem;
  & > h1 {
    text-align: center;
    padding-bottom: 4rem;
    @media (max-width: 767px) {
      padding-bottom: 1rem;
    }
  }
  & > div {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 3rem;
    & > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      & > p {
        padding-top: 1rem;
        font-weight: bold;
        font-size: ${({ theme }) => theme.fontSize.xl};
        @media (max-width: 767px) {
          font-size: ${({ theme }) => theme.fontSize.sm};
        }
      }
      & > img {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        @media (max-width: 767px) {
          width: 100px;
          height: 100px;
        }
      }
    }

    @media (max-width: 767px) {
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 1rem;
    }
  }
  @media (max-width: 767px) {
    padding: 1rem;
  }
`

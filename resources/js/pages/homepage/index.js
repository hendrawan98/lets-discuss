import React from 'react'
import { render } from 'react-dom'
import styled from 'styled-components'
import Cookies from 'universal-cookie'
import Axios from 'axios'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import Button from '@components/common/button'
import Card from '@components/common/card'
import Layout from '@components/common/layout'
import Typography from '@components/common/typography'
import Paragraph from '@components/common/paragraph'
import Link from '@components/common/link'
import Trending from '@icons/trending/trending.svg'
import Conference from '@icons/conference/conference.svg'
import Share from '@icons/share/share.svg'

const Container = styled.div`
  &:after {
    content: '';
    clear: both;
    display: table;
  }
`

const LeftContainer = styled.div`
  width: 43.7em;
  float: left;
`
const RightContainer = styled.div`
  width: 27em;
  float: right;
`

const SectionTitle = styled.div`
  align-items: center;

  &:after {
    content: '';
    clear: both;
    display: table;
  }
`

const TitleContainer = styled.div`
  display: flex;
  float: ${props => props.float};
`

const SectionContent = styled.div`
  padding-top: 20px;
`

const ConferenceContent = styled.div`
  border-bottom: 1px solid black;

  &:last-child {
    border-botton: none;
  }
`

function Homepage() {
  const cookie = new Cookies
  const [isLoggedin] = React.useState(!!cookie.get('acct'))
  const [forum, setForum] = React.useState([])
  const [conference, setConference] = React.useState([])
  const [copied, setCopied] = React.useState(false)
  React.useEffect(() => {
    const getInit = async () => {
      Axios.get('/api/list-forum?sort&&limit')
        .then(res => {
          // console.log(res)
          setForum(res.data)
        })
      Axios.get('/api/list-conference?sort&&limit')
        .then(res => {
          setConference(res.data)
        })
    }
    getInit()
  }, [])
  // React.useEffect(() => {}, [forum])
  return(
    <Layout>
      <Container>
        <LeftContainer>
          <SectionTitle>
            <TitleContainer float='left'>
              <Trending width="50px" height="50px" />
              <Typography fontSize={30} fontWeight="bold" lineHeight={45} type="span">Trending</Typography>
            </TitleContainer>
            { isLoggedin &&
              <TitleContainer float='right'>
                <Button width='263px' height='43px' backgroundColor='#1B751D' color='#FFFFFF' onClick={() => window.location.href='/create-forum'}>Buat Forum</Button>
              </TitleContainer>
            }
          </SectionTitle>
          <SectionContent>
            { forum.length >= 0 && forum.map((val, key) => {
              return (
                <Card marginTop={10} padding="20px" key={key}>
                  <b>{val && val.userName}</b> {val && val.created_at.split('T')[0]}
                  <Paragraph size={24} fontWeight="bold">{val && val.forumTitle}</Paragraph>
                  <CopyToClipboard text={`/view-forum/${val.forumTitle.replace(' ', '-')}`} onCopy={() => setCopied(true)}>
                    <label><Share fill={copied ? 'red' : 'black'} width="20px" />share</label>
                  </CopyToClipboard>
                  <Link color="#FFAB40" href={`/view-forum/${val.forumTitle.replace(' ', '-')}`}>LEARN MORE</Link>
                </Card>
              )
            }) }
          </SectionContent>
        </LeftContainer>
        <RightContainer>
          <SectionTitle>
            <TitleContainer float='left'>
              <Conference width="50px" height="50px" />
              <Typography fontSize={30} fontWeight="bold" lineHeight={45} type="span">Conference</Typography>
            </TitleContainer>
            { isLoggedin &&
              <TitleContainer float='right'>
                <Button width='263px' height='43px' backgroundColor='#1B751D' color='#FFFFFF' onClick={() => window.location.href='/create-conference'}>Buat Conference</Button>
              </TitleContainer>
            }
          </SectionTitle>
          <SectionContent>
            <Card marginTop={10}>
              lalala
              { conference.length >= 0 && conference.map((val, key) => {
                return (
                  <ConferenceContent>
                    <Link size={24} fontWeight="bold" href={`/conference/${val.id}`}>{val && val.forumTitle}</Link>
                    <b>{val && val.userName}</b> {val && val.created_at.split('T')[0]}
                  </ConferenceContent>
                )
              }) }
            </Card>
          </SectionContent>
        </RightContainer>
      </Container>
    </Layout>
  )
}

render(
  <Homepage />, document.getElementById('homepage')
)

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
import LearningSource from '@components/pages/home/learning-source'
import Trending from '@icons/trending/trending.svg'
import Conference from '@icons/conference/conference.svg'
import Share from '@icons/share/share.svg'
import Book from '@icons/book/book.svg'

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
  const [forumTopic, setForumTopic] = React.useState([])
  const [forum, setForum] = React.useState([])
  const [conference, setConference] = React.useState([])
  const [copied, setCopied] = React.useState(false)

  const getForum = (topic = "") => {
    Axios.get(`/api/list-forum?sort&&limit&&topic=${topic}`)
      .then(res => {
        // console.log(res)
        setForum(res.data)
      })
  }

  React.useEffect(() => {
    const getInit = async () => {
      Axios.get('/api/forum-topic').then(res => {
        setForumTopic(res.data)
      })
      getForum()
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
                <Button width='263px' height='43px' backgroundColor='#1B751D' color='#FFFFFF' onClick={() => window.location.href='/create-forum'}>Create Forum</Button>
              </TitleContainer>
            }
          </SectionTitle>
          <SectionContent>
            <p>
              <span>Topic: </span>
              <select style={{ width: '15em' }} onChange={e => getForum(e.target.value)}>
                <option disabled selected value="">Default</option>
                { forumTopic.length > 0 && forumTopic.map((val, key) => {
                  return <option key={key} value={val.topicId}>{val.topicName}</option>
                })}
              </select>
            </p>
            { forum.length >= 0 && forum.map((val, key) => {
              return (
                <Card marginTop={10} padding="20px" key={key}>
                  <b>{val && val.userName}</b> {val && val.created_at.split('T')[0]}
                  <Paragraph size={24} fontWeight="bold">{val && val.forumTitle}</Paragraph>
                  <CopyToClipboard text={`/view-forum/${val.forumTitle.split(' ').join('-')}`} onCopy={() => setCopied(true)}>
                    <label><Share fill={copied ? 'red' : 'black'} width="20px" />share</label>
                  </CopyToClipboard>
                  <Link color="#FFAB40" href={`/view-forum/${val.forumTitle.split(' ').join('-')}`}>LEARN MORE</Link>
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
                <Button width='200px' height='43px' backgroundColor='#1B751D' color='#FFFFFF' onClick={() => window.location.href='/create-conference'}>Create Conference</Button>
              </TitleContainer>
            }
          </SectionTitle>
          <SectionContent>
            <p>&nbsp;</p>
            <Card marginTop={10}>
              { conference.length >= 0 && conference.map((val, key) => {
                return (
                  <ConferenceContent>
                    <Link size='24' color="black" fontWeight="bold" href={`/conference/${val.viConTitle.split(' ').join('-')}`}>{val && val.viConTitle}</Link><br />
                    <b>{val && val.userName}</b> {val && val.created_at.split('T')[0]}
                  </ConferenceContent>
                )
              }) }
            </Card>
          </SectionContent>
        </RightContainer>
      </Container>

      {/* Section Learning Source */}
      <Container style={{paddingTop: '3em'}}>
        <SectionTitle>
          <TitleContainer float="left">
            <Book width="45px" height="45px" />
            <Typography fontSize={30} fontWeight="bold" lineHeight={45} type="span">Learning Source</Typography>
          </TitleContainer>
          <TitleContainer float="right">
            <Button width='100px' height='43px' backgroundColor='#1B751D' color='#FFFFFF' onClick={() => window.location.assign('/learning-source')}>See More</Button>
            <span style={{display: 'flex', alignItems: 'center', padding: '0 1em'}}>or</span>
            <Button width='100px' height='43px' backgroundColor='#1B751D' color='#FFFFFF' onClick={() => window.location.assign('/contribute')}>Contribute</Button>
          </TitleContainer>
        </SectionTitle>
        <SectionContent>
          <LearningSource />
        </SectionContent>
      </Container>
    </Layout>
  )
}

render(
  <Homepage />, document.getElementById('homepage')
)

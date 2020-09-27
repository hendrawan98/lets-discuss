import React from 'react'
import { render } from 'react-dom'
import styled from 'styled-components'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import Button from '@components/common/button'
import Card from '@components/common/card'
import Layout from '@components/common/layout'
import Paragraph from '@components/common/paragraph'
import Logo from '@icons/logo/logo.svg'
import Share from '@icons/share/share.svg'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const FormGroup = styled.div`
  margin: 10px auto;

  input {
    display: block;
    width: 100%;
    height: 48px;
  }

  textarea {
    display: block;
    width: 100%;
    height: 150px;
  }
`

const CardContainer = styled.div`
  &:after {
    content: '';
    clear: both;
    display: table;
  }
`

function ListLearningSource() {
  const cookie = new Cookies()
  const [sortBy] = React.useState([
    { text: 'latest', val: 'latest' },
    { text: 'oldest', val: 'oldest' },
  ])
  const [isLoggedin] = React.useState(!!cookie.get('acct'))
  const [url] = React.useState(window.location.href.split('?'))
  const [params] = React.useState(url[url.length - 1].split('&'))
  const [sort, setSort] = React.useState('')
  const [search, setSearch] = React.useState('')
  const [learningSource, setLearningSource] = React.useState([])

  const getList = async () => {
    axios.get(`/api/list-learning-source?sort=${sort}&search=${search}`)
      .then(res => {
        setLearningSource(res.data)
      }, res => alert('failed to get data, please refresh'))
  }

  React.useEffect(() => {
    const filteredParams = async () => {
      params.map(x => {
        if (x.includes('sort')) {
          setSort(x.slice(x.indexOf('=') + 1, x.length))
        } else if (x.includes('search')) {
          setSearch(x.slice(x.indexOf('=') + 1, x.length))
        }
      })
    }
    filteredParams()
  }, [])
  React.useEffect(() => {
    const timer = setTimeout(() => {
      getList()
    }, 5000);

    return () => clearTimeout(timer)
  }, [search, sort])
  const Content = () => {
    return (
      learningSource && learningSource.map((val, key) => {
        return (
          <Card marginTop={10} padding="20px" width="50em" key={key}>
            <CardContainer>
              <div style={{ float: 'left', width: '35em', borderRight: '1px solid black', display: 'flex' }}>
                <div>
                  <b>{val.userName}</b> {val.created_at.split('T')[0]}
                  <Paragraph size={24} fontWeight="bold">{val.sourceTitle}</Paragraph>
                  <Paragraph size={20}>{val.sourceDesc}</Paragraph>
                </div>
              </div>
              <div style={{ float: 'right', width: '14.9em' }}>
                <div style={{ marginLeft: '20px', height: '10em', display: 'flex', alignItems: 'center' }}>
                  {val.typeId === 1 && <iframe src={val.sourceUrl.replace("watch?v=", "embed/")} style={{ width: '90%' }} />}
                  {val.typeId === 2 && <Button onClick={() => window.location.assign(val.sourceUrl)}>Download</Button>}
                </div>
              </div>
            </CardContainer>
          </Card>
        )
      })
    )
  }
  const ContentHead = () => {
    return (
      <CardContainer style={{ width: '52.5em' }}>
        <div style={{ float: 'left', width: '13em', height: '2.3em', display: 'flex', alignItems: 'center' }}>
          <label style={{ marginRight: '0.5em' }}>sortBy:</label>
          <select style={{ width: '10em' }} onChange={e => setSort(e.target.value)}>
            {sortBy && sortBy.map((v, k) => {
              return <option value={v.val} key={k}>{v.text}</option>
            })}
          </select>
        </div>
        <div style={{ float: 'right', width: '16.5em' }}>
          <Button width='263px' height='43px' backgroundColor='#1B751D' color='#FFFFFF' onClick={() => window.location.assign('/contribute')}>Contribute</Button>
        </div>
      </CardContainer>
    )
  }
  return (
    <Layout>
      <Container>
        <div style={{ display: 'block' }}>
          <ContentHead />
          <Content />
        </div>
      </Container>
    </Layout>
  )
}

render(
  <ListLearningSource />, document.getElementById('list-learning-source')
)

import React from 'react'
import { render } from 'react-dom'
import styled from 'styled-components'
import axios from 'axios'
import Cookies from 'universal-cookie'

import Button from '@components/common/button'
import Card from '@components/common/card'
import Layout from '@components/common/layout'
import Typography from '@components/common/typography'
import Trending from '@icons/trending/trending.svg'
import Logo from '@icons/logo/logo.svg'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const FormGroup = styled.div`
  margin: 10px auto;

  input, select {
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

const doPost = (title, description, content, topic) => {
  !title && description && content && alert('title wajib diisi')
  title && !description && content && alert('description wajib diisi')
  title && description && !content && alert('content wajib diisi')
  !title && !description && content && alert('title dan description wajib diisi')
  !title && description && !content && alert('title dan content wajib diisi')
  title && !description && !content && alert('description dan content wajib diisi')
  !title && !description && content && alert('title dan description wajib diisi')
  !title && !description && !content && alert('title, description dan content wajib diisi')
  if(title && description && content) {
    const cookie = new Cookies()
    axios.post('/api/create-forum', { title: title, description: description, content: content, topic: topic, token: cookie.get('acct') })
      .then(res => {
        window.location.href = `/view-forum/${title.split(' ').join('-')}`
      }, res => alert('failed to create forum'))
  }
}

function CreateForum() {
  const [title, setTitle] = React.useState('');
  const [topic, setTopic] = React.useState(null);
  const [description, setDescription] = React.useState('');
  const [content, setContent] = React.useState('');
  const [forumTopic, setForumTopic] = React.useState([]);

  React.useEffect(() => {
    axios.get('/api/forum-topic').then(res => {
      setForumTopic(res.data)
    })
  }, [])
  return(
    <Layout>
      <Container>
        <div style={{display: 'block'}}>
          <Card marginTop={10} padding="20px" width="28em">
            <FormGroup>
              <input placeholder="Forum Title" onChange={ e => setTitle(e.target.value) } />
            </FormGroup>
            <FormGroup>
              <select onChange={e => setTopic(e.target.value)}>
                <option value={null} disabled selected>Forum Topic</option>
                {forumTopic && forumTopic.map((val,id) => {
                  return <option key={id} value={val.topicId}>{val.topicName}</option>
                })}
              </select>
            </FormGroup>
            <FormGroup>
              <textarea placeholder="Forum Description" onChange={ e => setDescription(e.target.value) } />
            </FormGroup>
            <FormGroup>
              <textarea placeholder="Forum Content" onChange={ e => setContent(e.target.value) } />
            </FormGroup>
            <Button onClick={() => doPost(title, description, content, topic)}>Post</Button>
          </Card>
        </div>
      </Container>
    </Layout>
  )
}

render(
    <CreateForum />, document.getElementById('create-forum')
)

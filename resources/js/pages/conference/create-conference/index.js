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

const doPost = (title) => {
  !title && alert('Title must be filled')
  if (title) {
    const cookie = new Cookies()
    axios.post('/api/create-conference', { title: title, token: cookie.get('acct') })
      .then(res => {
        window.location.href = `/conference/${title.split(' ').join('-')}`
      }, res => {alert('Failed to create conference')})
  }
}

function CreateConference() {
  const [title, setTitle] = React.useState('');
  return (
    <Layout>
      <Container>
        <div style={{ display: 'block' }}>
          <Card marginTop={10} padding="20px" width="28em">
            <FormGroup>
              <input placeholder="Conference Title" onChange={e => setTitle(e.target.value)} />
            </FormGroup>
            <Button onClick={() => doPost(title)}>Start</Button>
          </Card>
        </div>
      </Container>
    </Layout>
  )
}

render(
  <CreateConference />, document.getElementById('create-conference')
)

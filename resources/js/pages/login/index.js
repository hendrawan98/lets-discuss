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

const LeftContainer = styled.div`
  width: 43.7em;
  float: left;
`
const RightContainer = styled.div`
  width: 27em;
  float: right;
`

const SectionTitle = styled.div`
  display: flex;
  align-items: center;
`

const SectionContent = styled.div`
  padding-top: 20px;
`

const doLogin = (username, password, e) => {
  e.preventDefault()
  const cookies = new Cookies()
  !username && password && alert('username must be filled')
  username && !password && alert('password must be filled')
  !username && !password && alert('username and password must be filled')
  if(username && password) {
    axios.post('/api/login', { username: username, password: btoa(password) } )
      .then(res => {
        const profile = JSON.stringify(res.data.profile)
        localStorage.setItem('profile', profile)
        // alert('a')
        window.location.href = localStorage.getItem('previous') ? localStorage.getItem('previous') : '/'
      }, res => {
        alert('please login using valid username and password')
      })
  }
}

function Login() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  return(
    <Layout>
      <Container>
        <div style={{display: 'block'}}>
          <Logo width="270px" height="47px" />
          <Card marginTop={10} padding="20px">
            <form onSubmit={e => doLogin(username, password, e)}>
              <input placeholder="Username" onChange={ e => setUsername(e.target.value) } style={{display: 'block', width: '100%', height: '25px'}} />
              <input type="password" placeholder="Password" onChange={ e => setPassword(e.target.value) } style={{display: 'block', width: '100%', height: '25px'}} />
              <Button onClick={e => doLogin(username, password, e)}>Login</Button>
            </form>
          </Card>
        </div>
      </Container>
    </Layout>
  )
}

render(
    <Login />, document.getElementById('login')
)

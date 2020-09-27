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

  &:after {
    content: '';
    clear: both;
    display: table;
  }
`

const LeftContainer = styled.div`
  width: 30em;
  float: left;
`
const RightContainer = styled.div`
  width: 30em;
  float: right;
`

const SectionTitle = styled.div`
  display: flex;
  align-items: center;
`

const SectionContent = styled.div`
  padding-top: 20px;
`

const FormGroup = styled.div`
  margin: 10px auto;

  input {
    display: block;
    width: 100%;
    height: 48px;
  }
`
const FormGroupRadio = styled.div`
  margin: 10px auto;
  height: 48px;
  align-items: center;
  display: flex;
`
// END OF STYLE

// FUNCTION OF PAGE
const postRegister = (data) => {
  axios.post('/api/registration', data)
    .then(res => {
      const profile = JSON.stringify(res.data.profile)
      const previous = localStorage.getItem('previous')
      localStorage.setItem('profile', profile)
      window.location.href = previous ? previous : '/'
    }, res => alert('failed to register, please retry'))
}
// END OF PAGE FUNCTION

function Register() {
  const [fullName, setFullName] = React.useState(null)
  const [address, setAddress] = React.useState(null)
  const [date, setDate] = React.useState(null)
  const [email, setEmail] = React.useState(null)
  const [phone, setPhone] = React.useState(null)
  const [username, setUsername] = React.useState(null)
  const [userType, setUserType] = React.useState(null)
  const [password, setPassword] = React.useState(null)
  const [confirmPassword, setConfirmPassword] = React.useState(null)
  const [isSubmit, setIsSubmit] = React.useState(false)
  const [validUsername, setValidUsername] = React.useState('loading')
  React.useEffect(() => {
    if(isSubmit) {
      doRegistration()
    }
  }, [validUsername])
  const validateUsername = () => {
    setValidUsername('loading')
    axios.get(`/api/validate-username?username=${username}`)
      .then(response => {
        setValidUsername(JSON.stringify(response.data) === '{}')
      })
  }
  const validateInput = () => {
    let isError = false
    
    if (validUsername !== 'loading') {
      if(!fullName) {
        alert('Fullname must be filled')
        isError = true
      }
  
      if(!address) {
        alert('Address must be filled')
        isError = true
      }
  
      if(!username) {
        alert('username must be filled')
        isError = true
      }
  
      if(username && !validUsername) {
        alert(`${username} not available, please use other username`)
        isError = true
      }
  
      if((date && new Date(date) >= new Date()) || !date) {
        alert('Birth date must less then current date')
        isError = true
      }
  
      if((email && ((!email.includes('@') || (email.includes('@') && (email.indexOf('@') === 0 || email.indexOf('@') === email.length - 1))) || !email.includes('@') || (email.includes('.') && (email.indexOf('.') === 0 || email.indexOf('@') === email.length - 1)))) || !email) {
        alert('Please check your email format')
        isError = true
      }
  
      if((phone && (phone.length < 10 || phone.length > 12)) || !phone) {
        alert('Please check your phone number')
        isError = true
      }
  
      if(password !== confirmPassword) {
        alert('Password you insert not match')
        isError = true
      }
      
      return !isError
    }else setIsSubmit(true)
  }
  const doRegistration = async () => {
    if(await validateInput()) {
      postRegister({fullName, address, date, email, phone, username, userType, password:btoa(password)})
    }
  }
  return(
    <Layout>
      <Container>
        <LeftContainer>
          <Card marginTop={10} padding="20px" width="28em">
            <FormGroup>
              <input placeholder="Fullname" onChange={e => setFullName(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <input placeholder="Address" onChange={e => setAddress(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <input type="date" placeholder="Date of Birth" onChange={e => setDate(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <input placeholder="Phone Number" onChange={e => setPhone(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <input placeholder="Username" onChange={e => setUsername(e.target.value)} onBlur={() => validateUsername()} />
            </FormGroup>
            <FormGroupRadio>
              <input type="radio" id="regular" name="type" value="regular" onClick={e => setUserType(e.target.value)} /><label for="regular">Regular</label>
              <input type="radio" id="premium" name="type" value="premium" onClick={e => setUserType(e.target.value)} /><label for="premium">Premium</label>
            </FormGroupRadio>
            <FormGroup>
              <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <input type="password" placeholder="Confirm Password" onChange={e => setConfirmPassword(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Button width="100%" backgroundColor="#00CC00" color="#FFFFFF" type="submit" onClick={() => doRegistration()}>Register</Button>
            </FormGroup>
          </Card>
        </LeftContainer>
      </Container>
    </Layout>
  )
}

render(
    <Register />, document.getElementById('register')
)

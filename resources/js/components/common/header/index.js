import React from 'react'
import styled from 'styled-components'
import Cookies from 'universal-cookie'
import Axios from 'axios'

import Link from '@components/common/link'
import Logo from '@icons/logo/logo.svg'
import Search from '@icons/search/search.svg'
import Button from '@components/common/button'

const Wrapper = styled.div`
  align-items: center;
  background-color: #788B91;
  display: flex;
  height: 50px;
  padding: 0 2em;
`

const Input = styled.input`
  width: ${props => props.loggedin ? 500 : 290}px;
  height: 20px;
`

function Header() {
  const cookie = new Cookies()
  const [isLoggedin, setIsLoggedin] = React.useState(!!cookie.get('acct'))
  const [profile] = React.useState(JSON.parse(localStorage.getItem('profile')))
  const [search, setSearch] = React.useState('')
  const handleSearch = e => {
    e.preventDefault()
    window.location.href = `/view-forum?search=${search}`
  }
  return (
    <Wrapper>
      <Logo width="149px" height="31px" />
      <Link paddingLeft="1em" margin="0em 3em 0em 4.5em">Forum</Link>
      <Link margin="0em 4.5em 0em 3em">Conference</Link>
      <form onSubmit={e => handleSearch(e)}>
        <Input loggedin={isLoggedin} onChange={ e => setSearch(e.target.value) } />
      </form>
      <Search style={{backgroundColor: 'white'}} width="24px" onClick={e => handleSearch(e)} />
      { !isLoggedin && (
        <React.Fragment>
          <Button margin="0em 3em 0em 5.5em" onClick={() => window.location = '/login'} color="#7B8D93">Login</Button>
          <Button margin="0em 0em 0em 3em" onClick={() => window.location = '/register'} backgroundColor="#00CC00" color="#FFFFFF">Register</Button>
        </React.Fragment>
      )}
      { isLoggedin && <Link margin="0em 0em 0em 4.5em" onClick={() => window.location = '/'} >{profile.userName}</Link>}
    </Wrapper>
  )
}

export default Header

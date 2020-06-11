import React from 'react'
import styled from 'styled-components'

import Header from '@components/common/header'
import Footer from '@components/common/footer'

const Content = styled.div`
  padding: 3em;
  background-color: #E5E5E8;
  min-height: calc(81vh - 65px);
`

function Layout({ children }) {
  return (
    <React.Fragment>
      <Header />
      <Content>
        {children}
      </Content>
      <Footer />
    </React.Fragment>
  )
}

export default Layout

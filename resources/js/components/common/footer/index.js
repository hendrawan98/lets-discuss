import React from 'react'
import styled from 'styled-components'

import Paragraph from '@components/common/paragraph'

const Wrapper = styled.div`
  position: absolute;
  align-item: center;
  background-color: #788B91;
  height: 50px;
  width: 100%;
`

function Footer() {
  return (
    <Wrapper>
      <Paragraph color="#FFFFFF" textAlign="center">© 2020 LETS DISCUSS. All rights reserved</Paragraph>
    </Wrapper>
  )
}

export default Footer
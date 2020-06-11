import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const BasicInput = styled.input``

const IconInput = styled.input``

function Input({ children, variant }) {
  if (variant === 'basic') {
    return <BasicInput />
  } else {
    return <IconInput />
  }
}

Input.propTypes = {
  variant: PropTypes.string,
}

Input.defaultProps = {
  variant: 'basic',
}

export default Input

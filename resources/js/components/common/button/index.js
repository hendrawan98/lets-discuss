import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const setWidth = (width) => {
  if (typeof width === 'number') {
    return `${width}px`
  } else {
    return width
  }
}

const setHeight = (height) => {
  if (typeof height === 'number') {
    return `${height}px`
  } else {
    return height
  }
}

const setMargin = (margin) => {
  if (typeof margin === 'number') {
    return `${margin}px`
  } else {
    return margin
  }
}

const StyledButton = styled.button`
  color: ${props => props.color};
  background-color: ${props => props.backgroundColor};
  border-color: #00CC00;
  width: ${props => setWidth(props.width)};
  height: ${props => setHeight(props.height)};
  border-radius: 4px;
  margin: ${props => setMargin(props.margin)};
`

function Button({ backgroundColor, children, color, height, onClick, type, text, width, margin }) {
  return <StyledButton onClick={onClick} backgroundColor={backgroundColor} color={color} height={height} width={width} margin={margin}>{children}</StyledButton>
}

Button.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  text: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  margin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

Button.defaultProps = {
  type: 'submit',
  color: '#000000',
  onClick: null,
  backgroundColor: '#FFFFFF',
  width: '100px',
  height: '30px',
  margin: 0,
}

export default Button

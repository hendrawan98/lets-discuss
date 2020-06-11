import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const checkTypes = payload => {
  if (payload) {
    if (typeof payload === 'number') return `${payload}px`
    if (typeof payload === 'string') return `${payload}`
  }
}

const setMargin = payload => {
  if(Number(payload.options.margin) === 0) {
    return `
      margin-top: ${typeof payload.options.marginTop === 'string' ? payload.options.marginTop : `${payload.options.marginTop}px`};
      margin-right: ${typeof payload.options.marginRight === 'string' ? payload.options.marginRight : `${payload.options.marginRight}px`};
      margin-bottom: ${typeof payload.options.marginBottom === 'string' ? payload.options.marginBottom : `${payload.options.marginBottom}px`};
      margin-left: ${typeof payload.options.marginLeft === 'string' ? payload.options.marginLeft : `${payload.options.marginLeft}px`};
    `
  } else
    return `margin: ${typeof payload.options.margin === 'string' ? payload.options.margin : `${payload.options.margin}px`};`
}

const setPadding = payload => {
  if(Number(payload.options.padding) === 0) {
    return `
      padding-top: ${typeof payload.options.paddingTop === 'string' ? payload.options.paddingTop : `${payload.options.paddingTop}px`};
      padding-right: ${typeof payload.options.paddingRight === 'string' ? payload.options.paddingRight : `${payload.options.paddingRight}px`};
      padding-bottom: ${typeof payload.options.paddingBottom === 'string' ? payload.options.paddingBottom : `${payload.options.paddingBottom}px`};
      padding-left: ${typeof payload.options.paddingLeft === 'string' ? payload.options.paddingLeft : `${payload.options.paddingLeft}px`};
    `
  } else
    return `padding: ${typeof payload.options.padding === 'string' ? payload.options.padding : `${payload.options.padding}px`};`
}

const StyledCard = styled.div`
  background-color: ${props => props.options.backgroundColor};
  height: ${props => checkTypes(props.options.height)};
  width: ${props => checkTypes(props.options.width)};
  ${props => setMargin(props)}
  ${props => setPadding(props)}
`

function Card({ backgroundColor, children, height, width, padding, paddingTop, paddingRight, paddingBottom, paddingLeft, margin, marginTop, marginRight, marginBottom, marginLeft }) {
  const options = {
    backgroundColor: backgroundColor,
    height: height,
    width: width,
    padding: padding,
    paddingTop: paddingTop,
    paddingRight: paddingRight,
    paddingBottom: paddingBottom,
    paddingLeft: paddingLeft,
    margin: margin,
    marginTop: marginTop,
    marginRight: marginRight,
    marginBottom: marginBottom,
    marginLeft: marginLeft,
  }
  return <StyledCard options={options}>{children}</StyledCard>
}

Card.propTypes = {
  backgroundColor: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  padding: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  paddingTop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  paddingRight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  paddingBottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  paddingLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  margin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  marginTop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  marginRight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  marginBottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  marginLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

Card.defaultProps = {
  backgroundColor: 'white',
  height: '100%',
  width: '100%',
  padding: 0,
  paddingTop: '',
  paddingRight: '',
  paddingBottom: '',
  paddingLeft: '',
  margin: 0,
  marginTop: '',
  marginRight: '',
  marginBottom: '',
  marginLeft: '',
}

export default Card

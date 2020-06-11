import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const setFontSize = size => {
  if (size) {
    if (typeof size === 'number') return `font-size: ${size}px;`
    if (typeof size === 'string') return `font-size: ${size};`
  }
}

const setFontWeight = weight => {
  if (weight) {
    if (typeof weight === 'number') return `font-weight: ${weight}px;`
    if (typeof weight === 'string') return `font-weight: ${weight};`
  }
}

const setFontStyle = style => {
  if (style) return `font-style: ${style};`
}

const setTextAlign = align => {
  if (align) return `text-align: ${align};`
}

const setLineHeight = height => {
  if (height) {
    if (typeof height === 'number') return `line-height: ${height}px;`
    if (typeof height === 'string') return `line-height: ${height};`
  }
}

const setColor = color => {
  if (color) return `color: ${color};`
}

const defaultStyles = () => {
  return 'margin: 0;'
}

const Paragraph = styled.p`
  ${defaultStyles()}
  ${props => setFontSize(props.options.fontSize)}
  ${props => setFontWeight(props.options.fontWeight)}
  ${props => setFontStyle(props.options.fontStyle)}
  ${props => setTextAlign(props.options.textAlign)}
  ${props => setLineHeight(props.options.lineHeight)}
  ${props => setColor(props.options.color)}
`

const Span = styled.span`
  ${defaultStyles()}
  ${props => setFontSize(props.options.fontSize)}
  ${props => setFontWeight(props.options.fontWeight)}
  ${props => setFontStyle(props.options.fontStyle)}
  ${props => setTextAlign(props.options.textAlign)}
  ${props => setLineHeight(props.options.lineHeight)}
  ${props => setColor(props.options.color)}
`

function Typography({ children, color, fontSize, fontStyle, fontWeight, lineHeight, textAlign, type }) {
  const options = {
    color: color,
    fontSize: fontSize,
    fontStyle: fontStyle,
    fontWeight: fontWeight,
    lineHeight: lineHeight,
    textAlign: textAlign,
  }
  switch (type) {
    case 'span':
      return <Span options={options}>{children}</Span>
    default:
      return <Paragraph options={options}>{children}</Paragraph>
  }
  return 
}

Typography.propTypes = {
  type: PropTypes.string,
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fontWeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fontStyle: PropTypes.string,
  textAlign: PropTypes.string,
  lineHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
}

Typography.defaultProps = {
  type: 'p',
  fontSize: '14px',
  fontWeight: 'normal',
  fontStyle: 'normal',
  textAlign: 'left',
  lineHeight: 'normal',
  color: 'black',
}

export default Typography

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledParagraph = styled.p`
    font-size: ${({size}) => size}px;
    color: ${({color}) => color};
    text-align: ${({textAlign}) => textAlign};
    font-weight: ${({fontWeight}) => fontWeight};
`

function Paragraph({ color, size, textAlign, children, fontWeight }){
    return <StyledParagraph color={color} size={size} textAlign={textAlign} fontWeight={fontWeight}>{children}</StyledParagraph>
}

Paragraph.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    textAlign: PropTypes.string,
    fontWeight: PropTypes.string,
}

Paragraph.defaultProps = {
    size: 14,
    color: '#000000',
    textAlign: 'left',
    fontWeight: 'normal',
}

export default Paragraph

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const setMargin = payload => {
  if (payload.margin === "0 0.5em") {
    return `
      margin-top: ${
        typeof payload.marginTop === "string"
          ? payload.marginTop
          : `${payload.marginTop}px`
      };
      margin-right: ${
        typeof payload.marginRight === "string"
          ? payload.marginRight
          : `${payload.marginRight}px`
      };
      margin-bottom: ${
        typeof payload.marginBottom === "string"
          ? payload.marginBottom
          : `${payload.marginBottom}px`
      };
      margin-left: ${
        typeof payload.marginLeft === "string"
          ? payload.marginLeft
          : `${payload.marginLeft}px`
      };
    `;
  } else
    return `margin: ${
      typeof payload.margin === "string"
        ? payload.margin
        : `${payload.margin}px`
    };`;
};

const setPadding = payload => {
  if (payload.padding === "0 0.5em") {
    return `
      padding-top: ${
        typeof payload.paddingTop === "string"
          ? payload.paddingTop
          : `${payload.paddingTop}px`
      };
      padding-right: ${
        typeof payload.paddingRight === "string"
          ? payload.paddingRight
          : `${payload.paddingRight}px`
      };
      padding-bottom: ${
        typeof payload.paddingBottom === "string"
          ? payload.paddingBottom
          : `${payload.paddingBottom}px`
      };
      padding-left: ${
        typeof payload.paddingLeft === "string"
          ? payload.paddingLeft
          : `${payload.paddingLeft}px`
      };
    `;
  } else {
    return `padding: ${
      typeof payload.padding === "string"
        ? payload.padding
        : `${payload.padding}px`
    };`;
  }
};

const StyledLink = styled.a`
  user-select: none;
  text-decoration: none;
  color: ${props => props.color};
  ${props => setMargin(props)}
  ${props => setPadding(props)}
  font-weight: ${props => props.fontWeight};
  font-size: ${props => props.size};
`;

function Link({
  children,
  color,
  fontWeight,
  href,
  padding,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  margin,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  size,
}) {
  return (
    <StyledLink
      href={href}
      color={color}
      fontWeight={fontWeight}
      padding={padding}
      paddingTop={paddingTop}
      paddingRight={paddingRight}
      paddingBottom={paddingBottom}
      paddingLeft={paddingLeft}
      margin={margin}
      marginTop={marginTop}
      marginRight={marginRight}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      size={size}
    >
      {children}
    </StyledLink>
  );
}

Link.propTypes = {
  color: PropTypes.string,
  fontWeight: PropTypes.string,
  href: PropTypes.string,
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
  size: PropTypes.string,
};

Link.defaultProps = {
  color: "#FFFFFF",
  fontWeight: "normal",
  href: "/",
  padding: "0 0.5em",
  paddingTop: 0,
  paddingRight: "0.5em",
  paddingBottom: 0,
  paddingLeft: "0.5em",
  margin: "0 0.5em",
  marginTop: 0,
  marginRight: "0.5em",
  marginBottom: 0,
  marginLeft: "0.5em",
  size: '16px',
};

export default Link;

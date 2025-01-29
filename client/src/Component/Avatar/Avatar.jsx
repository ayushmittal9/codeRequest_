import React from 'react'

function Avatar({
    children,
    backgroudColor,
    px,
    py,
    color,
    borderRadius,fontSize,cursor
}) {
    const style= {
        backgroudColor,
        padding: `${py} ${px}`,
        color:color|| "black",
        borderRadius,
        fontSize,
        textAlign:"center",
        cursor:cursor||null,
        textDecoration: "none"
    };
  return (
    <div style={style}>{children}</div>
  )
}

export default Avatar

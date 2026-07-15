import React from 'react'

export default function IconButton({text,onClick,children,disabled,outline=false,customclasses,type}) {
  return (
    <button disabled={disabled} onClick={onClick} type={type} className={customclasses}>
        {
        children?(<><span>{text}</span>
        {children}</>):(text)
        }
    </button>
  )
}

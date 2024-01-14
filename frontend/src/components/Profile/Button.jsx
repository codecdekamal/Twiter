import React from 'react'

const Button = (props) => {
  return (
    <>
      <button className='bg-white text-black/80 ml-2 py-1 px-2 mt-2 rounded-md font-semibold hover:bg-transparent' onClick={props.notify} >{props.title || props.children}</button>
    </>
  )
}

export default Button

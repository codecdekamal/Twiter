import React from 'react'

const Input = (props) => {
  return (
    <>
        <label htmlFor={props.name} className='capitalize outline-0'>{props.name}</label>
           <input autoComplete='off' className={`p-1 rounded-md text-black text-center outline-none text-xl bg-white/80 hover:bg-white/90 ${props.onTurningRed && "outline-double outline-2 outline-red-700"}`} type={props.type} name={props.name} id={props.name} onChange={props.onChange} />
    </>
  )
}

export default Input

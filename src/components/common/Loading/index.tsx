import { Spin } from 'antd'
import React from 'react'

function Loading() {
  return (
    <div className='fixed w-screen h-screen top-0 left-0 flex justify-center items-center'>
      <div className='absolute w-full h-full top-[-24px] left-0 bg-black/20'></div>
      <Spin size='large' />
    </div>
  )
}

export default Loading
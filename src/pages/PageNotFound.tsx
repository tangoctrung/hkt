import React from 'react'
import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <div className='w-[100vsw] h-[100svh] flex flex-col justify-center items-center'>
      <div className='flex flex-col items-center'>
        <h1 className='text-8xl'>404</h1>
        <p>Không tìm thấy trang</p>
      </div>

      <Link to={"/"} className='mt-10 underline text-blue-600'>Về trang chủ</Link>
    </div>
  )
}

export default PageNotFound
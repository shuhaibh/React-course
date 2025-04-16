import React from 'react'

function Banner() {
  return (
    <div className='h-[20vh] md:h-[70vh] bg-cover bg-center flex items-end' style={{backgroundImage: 'url(https://kneelbeforeblog.s3.eu-west-1.amazonaws.com/wp-content/uploads/2019/04/25033528/AvengersEG2D_banner-Cropped.jpg)'}}>
        <div className='text-white text-2xl bg-gray-900/60 w-full text-center p-3'>Avengers Endgame</div>
    </div>
  )
}

export default Banner

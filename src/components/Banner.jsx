import React from 'react'
import interstellarImg from '../assets/Interstellar.jpg';

function Banner() {
  return (
    <div className='h-[75vh] bg-cover bg-center bg-no-repeat flex items-end ' style={{ backgroundImage: `url(https://images.squarespace-cdn.com/content/v1/5a78ab8490badee028bef0e9/1568935524292-TPSLMXHD9HE6PKN02YOG/Interstellar.jpg)` }}>
        <div className='text-white text-center w-full text-2xl bg-gray-900/60 p-4'>Interstellar</div>
    </div>
  )
}

export default Banner
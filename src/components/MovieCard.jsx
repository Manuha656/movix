import React from 'react'

function MovieCard({poster_path,name,handleaddWl,movieObj,handleremWl,wl}) {

  function doesContain(movieObj){
    for(let i=0;i<wl.length;i++){
      if(wl[i].id == movieObj.id)
        return true
    }
    return false
  }

  return (
    <div className='relative h-[40vh] w-[200px] bg-cover bg-center rounded-xl hover:cursor-pointer hover:scale-110 duration-300' style={{backgroundImage:`url(https://image.tmdb.org/t/p/original/${poster_path})`}}>
        
        {doesContain(movieObj)?
        <div onClick={()=>(handleremWl(movieObj))} className='absolute top-2 right-2 m-4 flex justify-center h-8 w-8 items-center rounded-lg bg-gray-900/90'>
          &#10060;
        </div>:
        <div onClick={()=>(handleaddWl(movieObj))} className='absolute top-2 right-2 m-4 flex justify-center h-8 w-8 items-center rounded-lg bg-gray-900/90'>
          &#10084;
        </div>}
        
        
        <div className='absolute bottom-0 text-white text-xl w-full p-2 text-center bg-gray-900/60 rounded-b-xl'>
          {name}
        </div>
    </div>
  )
}

export default MovieCard
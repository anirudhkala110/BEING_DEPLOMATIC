import React, { useRef } from 'react'

const AfterLogin = () => {

  const marqueeRef = useRef(null)

  const handleMouseEnter = () => {
    marqueeRef.current.stop()
  }

  const handleMouseLeave = () => {
    marqueeRef.current.start()
  }

  return (
    <div className='px-0 pt-5' style={{ zIndex: 999 }}>
      
      <div className='mt-3 pt-2 bg-black text-white'>

        <marquee
  behavior="alternate"
  direction="right"
  ref={marqueeRef}
  onMouseEnter={handleMouseEnter}
  onMouseLeave={handleMouseLeave}
>
  Official Website :
  
  <a
    href='https://beingdiplomatic.com/'
    target='_blank'
    rel='noreferrer'
    className='text-white text-decoration-none ms-2'
  >
    <b>Being</b>{' '}
    <b style={{ color: "red" }}>Diplomatic</b>
  </a>

</marquee>

      </div>

    </div>
  )
}

export default AfterLogin
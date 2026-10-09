import React from 'react'
import { Carousel } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <Carousel
      aria-label='Featured product stories'
      autoplay
      autoplaySpeed={4000}
      items={[
        <div className='rounded-lg bg-blue-500 px-6 py-10 text-center text-lg font-semibold text-white'>Slide 1</div>,
        <div className='rounded-lg bg-emerald-500 px-6 py-10 text-center text-lg font-semibold text-white'>Slide 2</div>,
        <div className='rounded-lg bg-amber-500 px-6 py-10 text-center text-lg font-semibold text-white'>Slide 3</div>,
      ]}
    />
  )
}

import React from 'react'

import { Carousel } from '@wuyangfan/nova-ui'

export default function CarouselBasicDemo() {
  return (
    <Carousel
      items={[
        <div
          key="1"
          className="rounded-lg bg-blue-500 px-10 py-10 text-center text-white"
        >
          Slide 1
        </div>,
        <div
          key="2"
          className="rounded-lg bg-emerald-500 px-10 py-10 text-center text-white"
        >
          Slide 2
        </div>,
        <div
          key="3"
          className="rounded-lg bg-amber-500 px-10 py-10 text-center text-white"
        >
          Slide 3
        </div>,
      ]}
    />
  )
}

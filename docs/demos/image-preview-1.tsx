import React from 'react'
import { ImagePreview } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <div className='inline-flex rounded-lg bg-slate-50 p-3 dark:bg-slate-900'>
      <ImagePreview
        src='https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600'
        alt='Mountain landscape'
      />
    </div>
  )
}

import React from 'react'
import { Mentions } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <div className='max-w-sm'>
      <Mentions
        aria-label='团队提及'
        options={[{ value: 'alice' }, { value: 'bob' }, { value: 'charlie' }]}
      />
    </div>
  )
}

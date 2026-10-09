import React from 'react'
import { Pagination } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <div className='flex flex-col gap-4'>
      <Pagination total={100} />
      <Pagination defaultCurrent={3} total={100} />
    </div>
  )
}

import React from 'react'
import { Button, Tooltip } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <div className='flex flex-wrap items-center gap-3'>
      <Tooltip content='显示在上方' placement='top'><Button>上方</Button></Tooltip>
      <Tooltip content='显示在右侧' placement='right'><Button variant='outline'>右侧</Button></Tooltip>
      <Tooltip content='显示在下方'><Button variant='outline'>下方</Button></Tooltip>
      <Tooltip content='显示在左侧' placement='left'><Button variant='outline'>左侧</Button></Tooltip>
      <Tooltip content='已禁用' disabled><Button variant='outline'>禁用</Button></Tooltip>
    </div>
  )
}

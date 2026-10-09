import React from 'react'
import { Upload } from '@wuyangfan/nova-ui'

export default () => {
  return (
    <Upload onChange={(files) => console.log(files)} />
  )
}

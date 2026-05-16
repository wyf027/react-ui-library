import React, { useState } from 'react'

import { Upload, type UploadFileItem } from '@wuyangfan/nova-ui'

export default function UploadBasicDemo() {
  const [items, setItems] = useState<UploadFileItem[]>([])

  return (
    <Upload
      accept="image/*"
      beforeUpload={(file) => file.type.startsWith('image/')}
      fileList={items}
      maxCount={5}
      maxSize={1024 * 1024}
      multiple
      onChange={(next) => {
        setItems((prev) => [...prev, ...next])
      }}
      onRemove={(f) => setItems((prev) => prev.filter((x) => x.uid !== f.uid))}
      triggerText="选择图片（示例）"
    />
  )
}

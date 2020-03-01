# react-avatar-crop

This is a simple react component used to crop avatar image.

# Usage

```typescript
import Cropper from 'react-avatar-crop'
import React, { useState } from 'react'

export default () => {
  const [croppedImage, setCroppedImage] = useState() // croppedImage is the Base64 representation of the final image
  return (
    <Cropper
      image="/url/to/image"
      onChange={setCroppedImage}
    />
  )
}
```

The cropper works best in a fixed-size container.

# Note

This component is purely created for my own convenience, as none of the existing avatar croppers offers all of the following functions:

1. move on drag
2. zoom by touch and wheel
3. rotate by touch and wheel
4. rounded preview
5. easy method to retrieve the final image in the Base64 format

I made the component based on my current requirements. There may be breaking changes in the future as my requirements change. Any suggestion that helps formalizing this component is welcome.

The versioning will fowllow semver 2.0.

# License

MIT

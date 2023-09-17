type ResizeOptions = {
  width?: number
  height?: number
  quality?: number
}

const getResizedImageDataUrl = async (
  file: Blob | MediaSource,
  { width, height, quality = 0.7 }: ResizeOptions
): Promise<string | null> => {
  return new Promise<string | null>((resolve, reject) => {
    const image = new Image()
    image.src = URL.createObjectURL(file)

    image.onload = () => {
      const { width: imageWidth, height: imageHeight } = image
      const canvas = document.createElement('canvas')
      let ctx: CanvasRenderingContext2D | null

      if (width && height) {
        canvas.width = width
        canvas.height = height
      } else if (width) {
        canvas.width = width
        canvas.height = Math.floor((imageHeight * width) / imageWidth)
      } else if (height) {
        canvas.width = Math.floor((imageWidth * height) / imageHeight)
        canvas.height = height
      } else {
        canvas.width = imageWidth
        canvas.height = imageHeight
      }

      ctx = canvas.getContext('2d')

      if (!ctx) {
        reject('Canvas context could not be created.')
        return
      }

      ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
      const dataUrl = canvas.toDataURL('image/jpeg', quality)
      resolve(dataUrl)
    }

    image.onerror = () => {
      reject('Image could not be loaded.')
    }
  })
}

export default getResizedImageDataUrl

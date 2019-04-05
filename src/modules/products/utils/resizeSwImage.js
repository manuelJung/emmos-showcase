const canvasContainerPromise = (width, height, imgUrl) => {
  return new Promise((resolve, reject) => {
    const img = new window.Image(),
      canvas = document.createElement('canvas'),
      context = canvas.getContext('2d')
    canvas.setAttribute('width', width)
    canvas.setAttribute('height', height)
    img.setAttribute('crossOrigin', '')
    img.onload = () => {
      try {
        context.drawImage(img,
          canvas.width / 2 - img.width / 2,
          canvas.height / 2 - img.height / 2
        )
        const url = canvas.toDataURL()
        resolve(url)
      } catch (e) {
        reject(imgUrl)
      }
    }
    img.src = imgUrl + '?' + new Date().getTime()
  })
}

export default function resizeSwImage(width, height, link, meta = {}) {
  if (!link) return ''
  const prefix = link.match(/(https?:\/\/)?[^/]+/)
  if (link.search(/;base64/) !== -1) return link
  if (link.search(/no-picture/) !== -1) return link
  if (!prefix) return link
  const imgUrl = `https://vega-direct.com/images/${width}x${height}${link.replace(prefix[0], '')}`

  if (meta.fitIntoContainer) {
    return canvasContainerPromise(width, height, imgUrl)
  } else {
    return imgUrl
  }
}
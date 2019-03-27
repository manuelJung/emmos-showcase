export default function trimText(txt, letters = 210, maxLines = 3) {
  const lines = txt.split(/[\n]+/)
  let result = '',
    blockedLetters = 0
  for (let i = 0; i < maxLines; i++) {
    const line = lines[i] || '',
      diff = letters - blockedLetters - line.length
    if (i > 0) result += '\n'
    if (diff > 0) result += line
    else result += line.slice(0, line.length + diff)
    if (blockedLetters + line.length >= letters) {
      result = result.split(' ').slice(0, -1).join(' ') + '...'
      break
    }
    blockedLetters += (letters / maxLines) > line.length ? letters / maxLines : line.length
  }
  return result
}

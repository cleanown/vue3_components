export function createRandomChinese (count: Number) {
  const start = parseInt('4e00', 16)
    const end = parseInt('9fa5', 16)
    let name = ''
    for(let i = 0; i < count; i++) {
      const cha = Math.floor(Math.random() * (end - start))
      name += '\\u' + (start + cha).toString(16)
    }
    return eval(`'${name}'`)
}
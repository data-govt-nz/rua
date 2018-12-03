export default function (
  string,
  delimiter = ','
) {
  const reg = new RegExp(
    '(([\'"]).*?\\2|[^\\s\'"' + delimiter + '][^\'"' + delimiter + ']*[^\\s\'"' + delimiter + '])',
    'gm'
  )
  return string.match(reg).map(function (item) {
    return item.replace(
      /^[\s'"]+|[\s'"]+$/gm,
      ''
    )
  })
}

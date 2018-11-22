import parse from './parse'

export default function (elements) {
  const tolerance = 1
  let lastTop = null,
    rows = []

  // group elements by their top position
  $(elements).each(function () {
    var $that = $(this),
      top = $that.offset().top - parse($that.css('margin-top')),
      lastRow = rows.length > 0 ? rows[rows.length - 1] : null

    if (lastRow === null) {
      // first item on the row, so just push it
      rows.push($that)
    } else {
      // if the row top is the same, add to the row group
      if (Math.floor(Math.abs(lastTop - top)) <= tolerance) {
        rows[rows.length - 1] = lastRow.add($that)
      } else {
        // otherwise start a new row group
        rows.push($that)
      }
    }

    // keep track of the last row top
    lastTop = top
  })

  return rows
}

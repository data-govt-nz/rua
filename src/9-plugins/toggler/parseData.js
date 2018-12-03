// Processes a given string and calls its functions

import split from './split'

const optionDelimiter = ';',
  funcDelimiter = ':',
  tsAttr = 'toggle-state'

export default function (
  element,
  dataAttribute,
  {
    forceState
  }
) {
  const data = {
    functions: [],
    state: true
  }

  if (typeof forceState !== typeof undefined) {
    data.state = forceState
  } else if (typeof $(element).data(tsAttr) !== typeof undefined) {
    data.state = $(element).data(tsAttr)
  }
  $(element).data(tsAttr, !data.state)

  const dataString = $(element).data(dataAttribute)
  if (typeof dataString !== typeof undefined && dataString !== false) {
    $(element).data(dataAttribute).split(optionDelimiter).forEach(function (value) {
      const o = value.split(funcDelimiter),
        option = o[0].trim(),
        variablesString = o[1],
        variables = (variablesString) ? split(variablesString) : null

      data.functions.push({
        option,
        element,
        forceState,
        state: data.state,
        variables,
        variablesString
      })
    })
  } else {
    console.log(
      'No options defined',
      element
    )
  }
  return data
}

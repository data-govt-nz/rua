// Processes a given string and calls its functions

import split from './split'


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
  const namespace = typeof window.dataTargetNamespace === 'undefined' ? '' : window.dataTargetNamespace.toString()
  const optionDelimiter = ';',
    funcDelimiter = ':',
    tsAttr = namespace + 'toggle-state'

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
      'No options defined for data-' + dataAttribute,
      element
    )
  }
  return data
}

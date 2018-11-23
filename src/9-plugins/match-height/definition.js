import globals from './globals'
import apply from './apply'
import parseOptions from './parseOptions'

export default function (element, options) {
  var opts = parseOptions(options)

  // handle remove
  if (opts.remove) {
    var that = element

    // remove fixed height from all selected elements
    element.css(opts.property, '')

    // remove selected elements from all groups
    $.each(globals.groups, function (key, group) {
      group.elements = group.elements.not(that)
    });

    return element
  }

  if (element.length <= 1 && !opts.target) {
    return element
  }

  // keep track of element group so we can re-apply later on load and resize events
  globals.groups.push({
    elements: element,
    options: opts
  });

  // match each element's height to the tallest element in the selection
  apply(element, opts)

  return element
}

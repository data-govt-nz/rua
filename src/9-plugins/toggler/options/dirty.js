// Dirty
//
// Simply adds a `dirty` class to the element indicating this element has been interacted with.  This option ignores the current state, therefore once interacted its perminant till page reload.
//
// This is useful for people with cognitive impairments may find it hard to remember what they have read and/or form elements.
//
// Parameters: `dirty: <optional dirty class>, <optional clean class>`
//
// Markup:
// <button class="button" data-click="dirty">Click</button>
// <button class="button" data-click="dirty: secondary">Click</button>
//
// Styleguide: Plugins.Toggler.Dirty

const dirtyClass = 'dirty',
  cleanClass = 'clean'

function getClasses(variables) {
  return {
    [dirtyClass]: ((variables && variables[0]) ? variables[0] : dirtyClass),
    [cleanClass]: ((variables && variables[1]) ? variables[1] : cleanClass)
  }
}

export function init({
  element,
  variables
}) {
  const classes = getClasses(variables)
  $(element).removeClass(classes[dirtyClass]).addClass(classes[cleanClass])
}

export function run({
  element,
  variables
}) {
  const classes = getClasses(variables)
  $(element).removeClass(classes[cleanClass]).addClass(classes[dirtyClass])
}

export default {
  init,
  run
}

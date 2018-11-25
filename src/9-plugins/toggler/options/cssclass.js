// Class
//
// Toggles the class of the element between 2 strings
//
// Parameters: `class: <css class>, <css class>`
//
// Markup:
// <button class="button" data-click="class: secondary">Click</button>
//
// Styleguide: Plugins.Toggler.Class

export function init({
  element,
  variables
}) {
  $(element).removeClass(variables[1]).addClass(variables[0])
}

export function run({
  element,
  state,
  variables
}) {
  if (state) {
    $(element).removeClass(variables[0]).addClass(variables[1])
  } else {
    $(element).removeClass(variables[1]).addClass(variables[0])
  }
}

export default {
  init,
  run
}

// Text
//
// Toggles the text of the element between 2 strings
//
// @todo Complete
//
// Markup:
// <button class="button" data-click="text: Hello World, Good bye"></button>
//
// Styleguide: Plugins.Toggler.Text

// String comma
//
// To prevent a comma from being considered a seperate string, wrap the string in double-quotes.
//
// Markup:
// <button class="button" data-click='text: "Hi world, im .." , Good bye'></button>
//
// Styleguide: Plugins.Toggler.Text.Comma

export function init({
  element,
  variables
}) {
  $(element).text(variables[0])
}

export function run({
  element,
  state,
  variables
}) {
  if (state) {
    $(element).text(variables[1])
  } else {
    $(element).text(variables[0])
  }
}

export default {
  init,
  run
}

// Text
//
// Toggles the text of the element between 2 strings
//
// @todo Complete
//
// Markup:
// <button class="button" data-click="text: Hello World, Good bye">Hello World</button>
//
// Styleguide: Plugins.Toggler.Text

export default function (owner, state, variables) {
  if (state) {
    $(owner).text(variables[1])
  } else {
    $(owner).text(variables[0])
  }
}

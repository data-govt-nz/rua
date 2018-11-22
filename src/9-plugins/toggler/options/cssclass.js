// Class
//
// Toggles the class of the element between 2 strings
//
// @todo Complete
//
// Markup:
// <button class="button" data-click="class: secondary">Click</button>
//
// Styleguide: Plugins.Toggler.Class


export default function (owner, state, variables) {
  if (state) {
    $(owner).removeClass(variables[0]).addClass(variables[1]);
  } else {
    $(owner).removeClass(variables[1]).addClass(variables[0]);
  }
}

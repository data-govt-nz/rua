// Dirty
//
// Simply adds a `dirty` class to the element indicating this element has been interacted with.  This option ignores the current state, therefore once interacted its perminant till page reload.
//
// This is useful for people with cognitive impairments may find it hard to remember what they have read and/or form elements.
//
// @todo Complete
//
// Markup:
// <button class="button" data-click="dirty">Click</button>
// <button class="button" data-click="dirty: secondary">Click</button>
//
// Styleguide: Plugins.Toggler.Class

export default function (owner, state, variables) {
  if (variables && variables[0]) {
    $(owner).addClass(variables[0])
  } else {
    $(owner).addClass('dirty')
  }

}

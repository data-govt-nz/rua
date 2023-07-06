// Aria Label
//
// Toggles the aria-label of the element between 2 strings
//
// Markup:
// <button class="button-icon" data-click="trigger: #toggle__icon, #aria-text; arialabel: 'Open', 'Close'" aria-label="Open">
//  <span id="toggle__icon" class="ri ri-chevron-down" data-toggle="class: ri-chevron-down, ri-chevron-up"></span>
//  </button>
//  <p>Open inspector to check aria-label</p>
//
// Styleguide: Plugins.Toggler.arialabel

export function init({
  element,
  variables
}) {
  $(element).attr('aria-label', variables[0])
}

export function run({
  element,
  state,
  variables
}) {
  if (state) {
    $(element).attr('aria-label', variables[1])
  } else {
    $(element).attr('aria-label', variables[0])
  }
}

export default {
  init,
  run
}

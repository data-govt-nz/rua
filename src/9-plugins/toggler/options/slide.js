// Slide
//
// Animates a element in and out of appearance.
//
// Markup:
// <button class="button" data-click="trigger: #slide-target">Click</button>
// <div id="slide-target" data-toggle="slide" style="display:none" aria-expanded="false">Maecenas sed diam eget risus varius blandit sit amet non magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</div>
//
// Styleguide: Plugins.Toggler.Slide

import ariaexpanded from './ariaexpanded'

export function init({
  element,
  state
}) {
  ariaexpanded.init({
    element,
    state
  })
}

export function run({
  element,
  state
}) {
  if (state) {
    $(element).slideDown()
  } else {
    $(element).slideUp()
  }
  ariaexpanded.run({
    element,
    state
  })
}

export default {
  init,
  run
}

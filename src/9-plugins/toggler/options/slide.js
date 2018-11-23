// Slide
//
// Animates a element in and out of appearance.
//
// @todo Complete
//
// Markup:
// <button class="button" data-click="trigger: #slide-target">Click</button>
// <div id="slide-target" data-toggle="slide" style="display:none" aria-expanded="false">Maecenas sed diam eget risus varius blandit sit amet non magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</div>
//
// Styleguide: Plugins.Toggler.Slide

const hiddenClass = 'hidden',
  visibleClass = 'visible'

export default function (owner, state, variables) {
  if (state) {
    $(owner).slideDown(function () {
      $(owner).removeClass(hiddenClass).addClass(visibleClass)
    })
  } else {
    $(owner).slideUp(function () {
      $(owner).addClass(hiddenClass).removeClass(visibleClass)
    })
  }
  $(owner).attr('aria-expanded', state)
}

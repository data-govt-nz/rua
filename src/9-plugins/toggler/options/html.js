// HTML
//
// Toggles the inner html of an element between itself and the given element identified by HTML ID
//
// Parameters: `html: <html id>, <html id>`
//
// Markup:
// <div data-click="html: #header-search-inactive, #header-search-active"></div>
// <script type="text/html" id="header-search-inactive">
//   <div class="button">
//     <span class="ri ri-chevron-down"></span>
//     <span>
//       Search
//     </span>
//   </div>
// </script>
// <script type="text/html" id="header-search-active">
//   <div class="button-icon">
//     <span class="ri ri-chevron-up"></span>
//   </div>
// </script>
//
// Styleguide: Plugins.Toggler.HTML

export function init({
  element,
  variables
}) {
  $(element).html($(variables[0]).html())
}

export function run({
  element,
  state,
  variables
}) {

  if (state) {
    $(element).html($(variables[1]).html())
  } else {
    $(element).html($(variables[0]).html())
  }
}

export default {
  init,
  run
}

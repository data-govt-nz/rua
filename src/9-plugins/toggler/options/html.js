// HTML
//
// Toggles the inner html of an element between itself and the given element identified by HTML ID
//
// @todo Complete
//
// Markup:
// <div data-click="trigger: #site-search; html: #header-search-inactive, #header-search-active">
//   <div class="button">
//     <span class="ri ri-chevron-down"></span>
//     <span>
//       Search
//     </span>
//   </div>
// </div>
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

export default function (owner, state, variables) {
  if (state) {
    $(owner).html($(variables[1]).html())
  } else {
    $(owner).html($(variables[0]).html())
  }
}

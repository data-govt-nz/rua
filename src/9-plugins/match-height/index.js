// Match height
//
// Use the data attribute data-mh="group-name" where group-name is an arbitrary string to identify which elements should be considered as a group.
//
// Markup:
// <div class="row margin-b-sm">
//   <div class="col-md-6">
//     <div class="bg-french-gray padding-sm" data-mh="group-name">
//       <b>With match height</b> Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut
//       fermentum massa justo sit amet risus. Maecenas faucibus mollis interdum. Morbi leo risus, porta ac
//       consectetur ac, vestibulum at eros.
//     </div>
//   </div>
//   <div class="col-md-6">
//     <div class="bg-french-gray padding-sm" data-mh="group-name">
//       <b>With match height</b> Aenean lacinia bibendum nulla sed consectetur. Lorem ipsum dolor sit amet,
//       consectetur adipiscing elit. Vestibulum id ligula porta felis euismod semper. Lorem ipsum dolor sit amet,
//       consectetur adipiscing elit. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
//     </div>
//   </div>
// </div>
// <div class="row margin">
//   <div class="col-md-6">
//     <div class="bg-heather padding-sm">
//       <b>Without match height</b> Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut
//       fermentum massa justo sit amet risus. Maecenas faucibus mollis interdum. Morbi leo risus, porta ac
//       consectetur ac, vestibulum at eros.
//     </div>
//   </div>
//   <div class="col-md-6">
//     <div class="bg-heather padding-sm">
//       <b>Without match height</b> Aenean lacinia bibendum nulla sed consectetur. Lorem ipsum dolor sit amet,
//       consectetur adipiscing elit. Vestibulum id ligula porta felis euismod semper. Lorem ipsum dolor sit amet,
//       consectetur adipiscing elit. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
//     </div>
//   </div>
// </div>
//
// Styleguide: Plugins.MatchHeight

// Inception
//
// Below is an example of using match height within another match height.
//
// Markup:
// <div class="row margin-b-sm">
//   <div class="col-md-6">
//     <div class="bg-french-gray padding-sm" data-mh="inception-1">
//       <div class="bg-secondary padding-sm margin-b-sm" data-mh="inception-2">
//         Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut
//         fermentum massa justo sit amet risus. Maecenas faucibus mollis interdum. Morbi leo risus, porta ac
//         consectetur ac, vestibulum at eros.
//       </div>
//       Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut
//       fermentum massa justo sit amet risus. Maecenas faucibus mollis interdum. Morbi leo risus, porta ac
//       consectetur ac, vestibulum at eros.
//     </div>
//   </div>
//   <div class="col-md-6">
//     <div class="bg-french-gray padding-sm" data-mh="inception-1">
//       <div class="bg-secondary padding-sm margin-b-sm" data-mh="inception-2">
//         Maecenas sed diam eget risus varius blandit sit amet non magna.
//       </div>
//       Aenean lacinia bibendum nulla sed consectetur. Lorem ipsum dolor sit amet,
//       consectetur adipiscing elit. Vestibulum id ligula porta felis euismod semper. Lorem ipsum dolor sit amet,
//       consectetur adipiscing elit. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
//     </div>
//   </div>
// </div>
//
// Styleguide: Plugins.MatchHeight.Inception

import globals from './globals'
import matchHeight from './definition'
import update from './update'

let previousResizeWidth = -1,
  updateTimeout = -1

function bindUpdate(throttle, event) {
  if (event && event.type === 'resize') {
    var windowWidth = $(window).width()
    if (windowWidth === previousResizeWidth) {
      return;
    }
    previousResizeWidth = windowWidth;
  }

  // throttle updates
  if (!throttle) {
    update(event);
  } else if (updateTimeout === -1) {
    updateTimeout = setTimeout(function () {
      update(event);
      updateTimeout = -1;
    }, globals.throttle)
  }
}

export default function () {
  const groups = {}

  /*
   *  bind events
   */

  // generate groups by their groupId set by elements using data-match-height
  $('[data-mh]').each(function () {
    const element = $(this),
      groupId = element.data('mh')

    if (groupId in groups) {
      groups[groupId] = groups[groupId].add(element)
    } else {
      groups[groupId] = element
    }
  })

  // apply matchHeight to each group
  $.each(groups, function () {
    matchHeight(this, true)
  })

  // update heights on load and resize events
  $(window).bind('load', function (event) {
    bindUpdate(false, event)
  })

  // throttled update heights on resize events
  $(window).bind('resize orientationchange', function (event) {
    bindUpdate(true, event)
  })
}

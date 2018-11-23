import globals from './globals'
import parse from './parse'
import parseOptions from './parseOptions'
import rowsCalc from './rowsCalc'

export default function (elements, options) {
  var opts = parseOptions(options),
    $elements = $(elements),
    rows = [$elements]

  // take note of scroll position
  var scrollTop = $(window).scrollTop(),
    htmlHeight = $('html').outerHeight(true)

  // get hidden parents
  var $hiddenParents = $elements.parents().filter(':hidden')

  // cache the original inline style
  $hiddenParents.each(function () {
    var $that = $(this)
    $that.data('style-cache', $that.attr('style'))
  })

  // temporarily must force hidden parents visible
  $hiddenParents.css('display', 'block')

  // get rows if using byRow, otherwise assume one row
  if (opts.byRow && !opts.target) {

    // must first force an arbitrary equal height so floating elements break evenly
    $elements.each(function () {
      var $that = $(this),
        display = $that.css('display')

      // temporarily force a usable display value
      if (display !== 'inline-block' && display !== 'flex' && display !== 'inline-flex') {
        display = 'block'
      }

      // cache the original inline style
      $that.data('style-cache', $that.attr('style'))

      $that.css({
        'display': display,
        'padding-top': '0',
        'padding-bottom': '0',
        'margin-top': '0',
        'margin-bottom': '0',
        'border-top-width': '0',
        'border-bottom-width': '0',
        'height': '100px',
        'overflow': 'hidden'
      })
    })

    // get the array of rows (based on element top position)
    rows = rowsCalc($elements)

    // revert original inline styles
    $elements.each(function () {
      var $that = $(this);
      $that.attr('style', $that.data('style-cache') || '')
    })
  }

  $.each(rows, function (key, row) {
    var $row = $(row),
      targetHeight = 0

    if (!opts.target) {
      // skip apply to rows with only one item
      if (opts.byRow && $row.length <= 1) {
        $row.css(opts.property, '')
        return
      }

      // iterate the row and find the max height
      $row.each(function () {
        var $that = $(this),
          style = $that.attr('style'),
          display = $that.css('display')

        // temporarily force a usable display value
        if (display !== 'inline-block' && display !== 'flex' && display !== 'inline-flex') {
          display = 'block'
        }

        // ensure we get the correct actual height (and not a previously set height value)
        var css = {
          'display': display
        };
        css[opts.property] = ''
        $that.css(css);

        // find the max height (including padding, but not margin)
        if ($that.outerHeight(false) > targetHeight) {
          targetHeight = $that.outerHeight(false)
        }

        // revert styles
        if (style) {
          $that.attr('style', style)
        } else {
          $that.css('display', '')
        }
      });
    } else {
      // if target set, use the height of the target element
      targetHeight = opts.target.outerHeight(false)
    }

    // iterate the row and apply the height to all elements
    $row.each(function () {
      var $that = $(this),
        verticalPadding = 0

      // don't apply to a target
      if (opts.target && $that.is(opts.target)) {
        return;
      }

      // handle padding and border correctly (required when not using border-box)
      if ($that.css('box-sizing') !== 'border-box') {
        verticalPadding += parse($that.css('border-top-width')) + parse($that.css('border-bottom-width'))
        verticalPadding += parse($that.css('padding-top')) + parse($that.css('padding-bottom'))
      }

      // set the height (accounting for padding and border)
      $that.css(opts.property, (targetHeight - verticalPadding) + 'px')
    })
  })

  // revert hidden parents
  $hiddenParents.each(function () {
    var $that = $(this)
    $that.attr('style', $that.data('style-cache') || null)
  })

  // restore scroll position if enabled
  if (globals.maintainScroll) {
    $(window).scrollTop((scrollTop / htmlHeight) * $('html').outerHeight(true))
  }

  return this
}

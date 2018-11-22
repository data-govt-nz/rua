/*
 *  parseOptions
 *  handle plugin options
 */

export default function (options) {
  var opts = {
    byRow: true,
    property: 'height',
    target: null,
    remove: false
  }

  if (typeof options === 'object') {
    return $.extend(opts, options)
  }

  if (typeof options === 'boolean') {
    opts.byRow = options
  } else if (options === 'remove') {
    opts.remove = true
  }

  return opts
}

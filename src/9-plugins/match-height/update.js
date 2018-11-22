import globals from './globals'
import apply from './apply'

export default function (event) {
  if (globals.beforeUpdate) {
    globals.beforeUpdate(event, globals.groups);
  }

  $.each(globals.groups, function () {
    apply(this.elements, this.options)
  });

  if (globals.afterUpdate) {
    globals.afterUpdate(event, globals.groups);
  }
}

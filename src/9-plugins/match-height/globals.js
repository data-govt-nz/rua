import rowsCalc from './rowsCalc'
import parse from './parse'
import parseOptions from './parseOptions'

export default {
  groups: [],
  throttle: 80,
  maintainScroll: false,
  beforeUpdate: null,
  afterUpdate: null,
  rows: rowsCalc(),
  parse: parse(),
  parseOptions: parseOptions()
}

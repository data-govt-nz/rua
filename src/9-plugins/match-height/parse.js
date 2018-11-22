// parse value and convert NaN to 0
export default function (value) {
  return parseFloat(value) || 0
};

func filter(arr, condition) {
  set newArr = [];
  for i = 0 to size(arr) {
    if condition(arr.i) -> newArr += arr.i;
  }

  return newArr;
}
let userInfo = {
  balance: 33333533.88888
}

function stylizeAmount(int){
  let splits = userInfo.balance.toFixed(2).split(".")
  let division = Math.floor(String(splits[0]).length / 3)
  let convertedInteger = String(splits[0]) 
  let value = ''
  for (let i = 0; i < division; i++) {
    let start = convertedInteger.length - (3 * (i + 1));
    let end = convertedInteger.length - (3 * i);
    value = ',' + convertedInteger.slice(start, end) + value;
  }
  value = convertedInteger.slice(0, convertedInteger.length % 3) + value;
  if (value.startsWith(',')) {
    value = value.slice(1);
  }
  // return value
  return value + `.${splits[1]}`
}
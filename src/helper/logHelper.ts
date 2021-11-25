export function logger(namespace: any) {
  function loggerChild(response: any) {
    console.log(`${namespace} ${response}`);
  }
  return loggerChild;
}

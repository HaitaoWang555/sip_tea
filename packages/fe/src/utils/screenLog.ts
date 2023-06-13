export const printANSI = () => {
  const text = `
    Published ${__APP_VERSION__}
    Build date: ${__BUILD_DATE__}`
  console.warn(`%c${text}`, 'color: #fc4d50')
}

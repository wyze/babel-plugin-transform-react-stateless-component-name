export default () => new Promise(resolve => {
  window.addEventListener('scroll', () => {
    resolve(window.scroll)
  })
})

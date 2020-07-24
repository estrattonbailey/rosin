/** imports */
import rosin from '../../index.js'

/** hot module reloading */
if (module.hot && process && process.env.NODE_ENV !== 'production') {
  module.hot.accept()
}

/** application code */
const root = document.getElementById('root')

const swiper = rosin(root)

swiper.on('drag', arg => {
  console.log(arg)
  root.innerHTML = `<pre>${JSON.stringify(arg, null, '  ')}</pre>`
})

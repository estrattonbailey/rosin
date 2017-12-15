# rosin
A tiny single-finger tap, double-tap, and swipe library. **< 1kb gzipped**.

```javascript
import rosin from 'rosin'

const swiper = new rosin(document.getElementById('root'))

swiper.on('tap', ({ x, y }) => {})
swiper.on('doubleTap', ({ x, y }) => {})

/**
 * Fired on every tick
 */
swiper.on('move', ({ x, y }) => {})
swiper.on('moveLeft', ({ x, y }) => {})
swiper.on('moveRight', ({ x, y }) => {})
swiper.on('moveUp', ({ x, y }) => {})
swiper.on('moveDown', ({ x, y }) => {})

/**
 * Fired once on each swipe
 */
swiper.on('left', () => {})
swiper.on('right', () => {})
swiper.on('up', () => {})
swiper.on('down', () => {})
```

MIT

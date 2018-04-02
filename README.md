# rosin
A tiny single-finger tap, double-tap, and swipe library. Works with touch and/or
mouse events. **700 bytes gzipped.**

## Install
```
npm i rosin --save
```

# Usage
```javascript
import rosin from 'rosin'

const swiper = rosin(document.body)

swiper.on('tap', ({ x, y }) => {})
swiper.on('doubleTap', ({ x, y }) => {})

/** Fired on every tick */
swiper.on('move', ({ x, y }) => {})
swiper.on('moveLeft', ({ x, y }) => {})
swiper.on('moveRight', ({ x, y }) => {})
swiper.on('moveUp', ({ x, y }) => {})
swiper.on('moveDown', ({ x, y }) => {})

/** Fired once on each swipe */
swiper.on('left', () => {})
swiper.on('right', () => {})
swiper.on('up', () => {})
swiper.on('down', () => {})
```
Each emitter also returns a function to destroy itself:
```javascript
const tapListener = swiper.on('tap', () => {})

tapListener() // destroy listener
```
To destroy the entire instance:
```javascript
swiper.destroy()
```

## License
MIT License © [Eric Bailey](https://estrattonbailey.com)

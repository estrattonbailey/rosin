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

swiper.on('tap', ({ x, y }, e) => {})
swiper.on('mouseup', ({ x, y }, e) => {})
swiper.on('mousedown', ({ x, y }, e) => {})

/** Fired on every tick */
swiper.on('drag', ({ x, y }, e) => {})
swiper.on('dragLeft', ({ x, y }, e) => {})
swiper.on('dragRight', ({ x, y }, e) => {})
swiper.on('dragUp', ({ x, y }, e) => {})
swiper.on('dragDown', ({ x, y }, e) => {})

/** Fired once on each swipe */
swiper.on('left', ({ x, y }, e) => {})
swiper.on('right', ({ x, y }, e) => {})
swiper.on('up', ({ x, y }, e) => {})
swiper.on('down', ({ x, y }, e) => {})
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

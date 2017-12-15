# rosin
A tiny single-finger tap, double-tap, and swipe library. **< 1kb gzipped**.

```javascript
import rosin from 'rosin'

const swipeable = document.getElementById('root')

const listener = rosin(swipeable)

listener.on('tap', ({ x, y }) => {})
listener.on('doubleTap', ({ x, y }) => {})

/**
 * Fired on every tick
 */
listener.on('move', ({ x, y }) => {})
listener.on('moveLeft', ({ x, y }) => {})
listener.on('moveRight', ({ x, y }) => {})
listener.on('moveUp', ({ x, y }) => {})
listener.on('moveDown', ({ x, y }) => {})

/**
 * Fired once on each swipe
 */
listener.on('left', () => {})
listener.on('right', () => {})
listener.on('up', () => {})
listener.on('down', () => {})
```

MIT

import mitt from 'mitt'

class Touchy {
  constructor (scope) {
    this.cancel() // add props to object

    scope.addEventListener('touchstart', this.start.bind(this))
    scope.addEventListener('touchmove', this.move.bind(this))
    scope.addEventListener('touchend', this.end.bind(this))
    scope.addEventListener('touchcancel', this.cancel.bind(this))

    Object.assign(this, mitt())
  }

  start (e) {
    const isDoubleTap = this.touch.start.x !== null

    if (isDoubleTap) {
      clearTimeout(this.doubleTapTimeout)

      this.next.start = {
        x: e.touches[0].pageX,
        y: e.touches[0].pageY
      }

      if (
        Math.abs(this.touch.start.x - this.next.start.x) < 30 &&
        Math.abs(this.touch.start.y - this.next.start.y) < 30
      ) {
        this.emit('doubleTap', this.next.start)
      }
    } else {
      this.touch.start = {
        x: e.touches[0].pageX,
        y: e.touches[0].pageY
      }
    }
  }

  end () {
    this.emit('tap', this.touch.start)

    this.doubleTapTimeout = setTimeout(() => {
      this.cancel()
    }, 500)
  }

  move (e) {
    this.touch.end = {
      x: e.touches[0].pageX,
      y: e.touches[0].pageY
    }

    const deltaX = this.touch.end.x - this.touch.start.x
    const deltaY = this.touch.end.y - this.touch.start.y
    const travelX = Math.abs(deltaX)
    const travelY = Math.abs(deltaY)
    const isHorizontal = travelX > travelY
    const isVertical = !isHorizontal

    if (travelX > 30 || travelY > 30) {
      this.emit('move', this.touch.end)

      if (deltaX > 0 && isHorizontal) {
        this.emit('moveRight', this.touch.end)
        if (this.dir !== 'right') {
          this.emit('right')
          this.dir = 'right'
        }
      } else if (deltaX < 0 && isHorizontal) {
        this.emit('moveLeft', this.touch.end)
        if (this.dir !== 'left') {
          this.emit('left')
          this.dir = 'left'
        }
      } else if (deltaY > 0 && isVertical) {
        this.emit('moveDown', this.touch.end)
        if (this.dir !== 'down') {
          this.emit('down')
          this.dir = 'down'
        }
      } else if (deltaY < 0 && isVertical) {
        this.emit('moveUp', this.touch.end)
        if (this.dir !== 'up') {
          this.emit('up')
          this.dir = 'up'
        }
      }
    }
  }

  cancel (e) {
    this.dir = null

    this.touch = {
      start: {
        x: null,
        y: null
      },
      end: {
        x: null,
        y: null
      }
    }
    this.next = {
      start: {
        x: null,
        y: null
      },
      end: {
        x: null,
        y: null
      }
    }
  }
}

const touchy = new Touchy(document.body)

touchy.on('tap', (e) => {
  console.log('tap', e)
})
touchy.on('doubleTap', (e) => {
  console.log('doubleTap', e)
})
touchy.on('move', (e) => {
  console.log('move', e)
})
touchy.on('moveRight', (e) => {
  console.log('moveRight', e)
})
touchy.on('moveLeft', (e) => {
  console.log('moveLeft', e)
})
touchy.on('moveUp', (e) => {
  console.log('moveUp', e)
})
touchy.on('moveDown', (e) => {
  console.log('moveDown', e)
})
touchy.on('right', (e) => {
  console.log('right')
})
touchy.on('left', (e) => {
  console.log('left')
})
touchy.on('up', (e) => {
  console.log('up')
})
touchy.on('down', (e) => {
  console.log('down')
})

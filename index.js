const abs = Math.abs

function pos (e, y) {
  return e.touches ? e.touches[0][y ? 'pageY' : 'pageX'] : e[y ? 'clientY' : 'clientX']
}

export default function rosin (ctx) {
  let dir
  let x1
  let y1
  let x2
  let y2
  let doubleTap = false
  let focus = false
  let timeout

  const fns = {}

  function start (e) {
    if (e.target === ctx || ctx.contains(e.target)) {
      focus = true

      if (x2 && y2) {
        clearTimeout(timeout)

        doubleTap = true

        const x = pos(e)
        const y = pos(e, 1)

        if (abs(x2 - x) < 30 && abs(y2 - y) < 30) {
          emit('doubleTap', { x, y })
        }
      } else {
        x1 = pos(e)
        y1 = pos(e, 1)
        x2 = x1
        y2 = y1
      }
    }
  }

  function end (e) {
    if ((e.target === ctx || ctx.contains(e.target)) && !doubleTap) {
      emit('tap', {
        x: x1,
        y: y1
      })
    }

    cancel()

    timeout = setTimeout(cancelDoubleTap, 500)
  }

  function move (e) {
    if (focus) {
      const deltaX = pos(e) - x1
      const deltaY = pos(e, 1) - y1
      const travelX = abs(deltaX)
      const travelY = abs(deltaY)
      const horizontal = travelX > travelY

      const payload = { x: deltaX, y: deltaY }

      emit('move', payload)

      if (deltaX > 0 && horizontal) {
        emit('moveRight', payload)

        if (dir !== 'right') {
          emit('right')
          dir = 'right'
        }
      } else if (deltaX < 0 && horizontal) {
        emit('moveLeft', payload)

        if (dir !== 'left') {
          emit('left')
          dir = 'left'
        }
      } else if (deltaY > 0 && !horizontal) {
        emit('moveDown', payload)

        if (dir !== 'down') {
          emit('down')
          dir = 'down'
        }
      } else if (deltaY < 0 && !horizontal) {
        emit('moveUp', payload)

        if (dir !== 'up') {
          emit('up')
          dir = 'up'
        }
      }
    }
  }

  function emit (type, payload) {
    if (fns[type]) for (let i = 0; i < fns[type].length; i++) fns[type][i](payload)
  }

  function cancel () {
    dir = null
    x1 = null
    y1 = null
    focus = false
  }

  function cancelDoubleTap () {
    x2 = null
    y2 = null
    doubleTap = false
  }

  window.addEventListener('mousedown', start)
  window.addEventListener('touchstart', start)

  window.addEventListener('mouseup', end)
  window.addEventListener('touchend', end)

  window.addEventListener('mousemove', move)
  window.addEventListener('touchmove', move)

  window.addEventListener('touchcancel', cancel)

  return {
    on (type, fn) {
      fns[type] = fns[type] || []
      fns[type].indexOf(fn) < 0 && fns[type].push(fn)
      return () => fns[type].splice(fns[type].indexOf(fn), 1)
    },
    destroy () {
      window.removeEventListener('mousedown', start)
      window.removeEventListener('touchstart', start)

      window.removeEventListener('mouseup', end)
      window.removeEventListener('touchend', end)

      window.removeEventListener('mousemove', move)
      window.removeEventListener('touchmove', move)

      window.removeEventListener('touchcancel', cancel)
    }
  }
}

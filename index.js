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
  let focus = false
  let timeout
  let dragging = false

  const fns = {}

  function start (e) {
    if (e.target === ctx || ctx.contains(e.target)) {
      focus = true

      emit('mousedown', null, e)

      x1 = pos(e)
      y1 = pos(e, 1)
      x2 = x1
      y2 = y1
    }
  }

  function end (e) {
    if (e.target === ctx || ctx.contains(e.target)) {
      emit('mouseup', null, e)

      if (dragging) {
        emit('dragEnd', null, e)
      } else {
        emit('tap', {
          x: x1,
          y: y1
        }, e)
      }
    }

    cancel()
  }

  function move (e) {
    if (focus) {
      const deltaX = pos(e) - x1
      const deltaY = pos(e, 1) - y1
      const travelX = abs(deltaX)
      const travelY = abs(deltaY)
      const horizontal = travelX > travelY

      const payload = { x: deltaX, y: deltaY }

      if (travelX < 10 && travelY < 10) return

      dragging = true

      emit('drag', payload, e)

      if (deltaX > 0 && horizontal) {
        emit('dragRight', payload, e)

        if (dir !== 'right') {
          emit('right', null, e)
          dir = 'right'
        }
      } else if (deltaX < 0 && horizontal) {
        emit('dragLeft', payload, e)

        if (dir !== 'left') {
          emit('left', null, e)
          dir = 'left'
        }
      } else if (deltaY > 0 && !horizontal) {
        emit('dragDown', payload, e)

        if (dir !== 'down') {
          emit('down', null, e)
          dir = 'down'
        }
      } else if (deltaY < 0 && !horizontal) {
        emit('dragUp', payload, e)

        if (dir !== 'up') {
          emit('up', null, e)
          dir = 'up'
        }
      }
    }
  }

  function emit (type, payload, event) {
    if (fns[type]) for (let i = 0; i < fns[type].length; i++) fns[type][i](payload, event)
  }

  function cancel () {
    dir = null
    x1 = null
    y1 = null
    focus = false
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

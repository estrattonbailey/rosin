const abs = Math.abs

function coord (e, y) {
  return e.touches ? e.touches[0][y ? 'pageY' : 'pageX'] : e[y ? 'clientY' : 'clientX']
}

function coords (ctx, e) {
  const { top, bottom, left, right } = ctx.getBoundingClientRect()
  const x = coord(e) - left
  const y = coord(e, 1) - top

  return {
    x,
    y,
    px: x / (right - left),
    py: y / (bottom - top)
  }
}

export default function rosin (ctx) {
  let dir
  let x
  let y
  let focus = false
  let dragging = false

  const fns = {}

  function start (e) {
    if (e.target === ctx || ctx.contains(e.target)) {
      focus = true

      const pos = coords(ctx, e)

      x = pos.x
      y = pos.y

      emit('start', { x, y }, e)
    }
  }

  function end (e) {
    if (focus) {
      emit('end', e)

      if (dragging) {
        emit('dragEnd', e)
      } else {
        emit('tap', { x, y }, e)
      }
    }

    cancel()
  }

  function move (e) {
    if (focus) {
      const cancel = e.preventDefault.bind(e)
      const pos = coords(ctx, e)
      const deltaX = pos.x - x
      const deltaY = pos.y - y
      const travelX = abs(deltaX)
      const travelY = abs(deltaY)
      const horizontal = travelX > travelY

      if (travelX < 10 && travelY < 10) return

      const payload = {
        px: pos.px,
        py: pos.py,
        ix: x,
        iy: y,
        dx: deltaX,
        dy: deltaY,
        x: x + deltaX,
        y: y + deltaY,
      }

      dragging = true

      fns.drag && cancel()

      emit('drag', payload, e)

      if (deltaX > 0 && horizontal) {
        fns.dragRight && cancel()

        emit('dragRight', payload, e)

        if (dir !== 'right') {
          emit('right', { x, y }, e)
          dir = 'right'
        }
      } else if (deltaX < 0 && horizontal) {
        fns.dragLeft && cancel()

        emit('dragLeft', payload, e)

        if (dir !== 'left') {
          emit('left', { x, y }, e)
          dir = 'left'
        }
      } else if (deltaY > 0 && !horizontal) {
        fns.dragDown && cancel()

        emit('dragDown', payload, e)

        if (dir !== 'down') {
          emit('down', { x, y }, e)
          dir = 'down'
        }
      } else if (deltaY < 0 && !horizontal) {
        fns.dragUp && cancel()

        emit('dragUp', payload, e)

        if (dir !== 'up') {
          emit('up', { x, y }, e)
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
    x = null
    y = null
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

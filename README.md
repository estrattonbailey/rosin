# rosin

A tiny single-finger tap and swipe library. Works with touch and/or mouse
events. **700 bytes gzipped.**

## Install

```
npm i rosin --save
```

# Usage

```javascript
import rosin from "rosin";

const swiper = rosin(document.body);
```

Emitted values are _relative_ to the DOM node you instantiated on.

```javascript
swiper.on("tap", ({ x, y }, e) => {});
swiper.on("mouseup", ({ x, y }, e) => {});
swiper.on("mousedown", ({ x, y }, e) => {});

/** Fired once on each swipe */
swiper.on("left", ({ x, y }, e) => {});
swiper.on("right", ({ x, y }, e) => {});
swiper.on("up", ({ x, y }, e) => {});
swiper.on("down", ({ x, y }, e) => {});
```

Drag events emit a different payload. It looks like this:

```
{
  ix, // initial X coordinate
  iy, // initial Y coordinate
  dx, // delta (change) in X coordinate
  dy, // delta (change) in Y coordinate
  x,  // current X coordinate
  y,  // current Y coordinate
}
```

```javascript
/** Fired on every animation frame */
swiper.on("drag", (coords, e) => {});
swiper.on("dragLeft", (coords, e) => {});
swiper.on("dragRight", (coords, e) => {});
swiper.on("dragUp", (coords, e) => {});
swiper.on("dragDown", (coords, e) => {});
```

Each emitter also returns a function to destroy itself:

```javascript
const tapListener = swiper.on("tap", () => {});

tapListener(); // destroy listener
```

To destroy the entire instance:

```javascript
swiper.destroy();
```

## License

MIT License © [Eric Bailey](https://estrattonbailey.com)

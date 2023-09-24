## Retro 3D Sky with Pixelated Stars

This project merges the charm of retro, pixelated graphics with the modern 3D canvas capabilities using `react-three-fiber`. Bringing together pixel art stars and a 3D environment provides a unique visual experience that's reminiscent of old-school games, but with a fresh twist.

[Screencast from 09-24-2023 05:02:23 AM.webm](https://github.com/pandamanxv3/PIxelatedNightSky/assets/92925204/c2d927b6-36a4-481e-805a-0de466921f22)

### Live Preview:

Experience the pixelated night sky for yourself. View the [live demo on CodeSandbox](https://codesandbox.io/p/sandbox/github/pandamanxv3/PIxelatedNightSky).

### Features:

- **Pixel Stars**: Each star in the sky isn't just a dot—it's a pixel artwork. The stars have frame-by-frame animations, a nod to classic pixel-based games.
  
- **Shooting Stars**: A different take on shooting stars. Instead of moving across the screen, they play a brief pixel art animation, making them appear and then fade, mimicking the transient nature of shooting stars in the real sky.

- **Sky Rotation**: The entire sky subtly rotates, adding depth and movement to the 3D environment.

### Technical Details:

1. **Pixel Star Animation**: `@react-three/drei` is utilized for texture loading, with the animations handled by `gsap`.
  
2. **Shooting Star Effect**: This is achieved by manipulating opacity. The pixel art shooting star briefly becomes visible, then fades.

3. **Initial Background Transition**: The default white background smoothly transitions to a darker blue when the canvas loads. This transition is a one-off event at the beginning, facilitated by `chroma-js`.

### Used Libraries:

- `react-three-fiber`: For 3D environment setup.
- `@react-three/drei`: Utilities like texture loading.
- `gsap`: Manages animations.
- `chroma-js`: Handles the initial background color transition.
- `math-random`: Generates random numbers for star placement.

### Setup:

```bash
npm install
npm start
```
---
To see this in action, check out the [live demo on CodeSandbox](https://codesandbox.io/p/sandbox/github/pandamanxv3/PIxelatedNightSky).
---
Check it out, and enjoy this blend of retro and modern design!

SandBox: https://codesandbox.io/p/sandbox/github/pandamanxv3/PIxelatedNightSky

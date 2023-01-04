import { distance, force } from './utils.js';

const config = {
  scale: 2.50e+11,
  bodies: [
    {x: 1.4960e+11, y: 0.0000e+00, vx: 0.0000e+00, vy: 2.9800e+04, m: 5.9740e+24, image: 'earth.gif'},
    {x: 2.2790e+11, y: 0.0000e+00, vx: 0.0000e+00, vy: 2.4100e+04, m: 6.4190e+23, image: 'mars.gif'},
  {x: 5.7900e+10, y: 0.0000e+00, vx: 0.0000e+00, vy: 4.7900e+04, m: 3.3020e+23, image: 'mercury.gif'},
    {x: 0.0000e+00, y: 0.0000e+00, vx: 0.0000e+00, vy: 0.0000e+00, m: 1.9890e+30, image: 'sun.gif'},
    {x: 1.0820e+11, y: 0.0000e+00, vx: 0.0000e+00, vy: 3.5000e+04, m: 4.8690e+24, image: 'venus.gif'}
  ]
}

// Your code here
const step = (contextWrapper, deltaT) => {
  contextWrapper.setScale(config.scale);
  contextWrapper.clear()
  let fx = new Array(config.bodies.length);
  let fy = new Array(config.bodies.length);

  for (let i = 0; i < config.bodies.length; i++) {
          let sum_fx = 0;
          let sum_fy = 0;
      for (let j = 0; j < config.bodies.length; j++) {
          if (i !== j){
            let ibody = config.bodies[i];
            let jbody = config.bodies[j];
            let r = distance(ibody.x, ibody.y, jbody.x, jbody.y);
            let f = force(ibody.m, jbody.m, r);

            sum_fx += (f*(jbody.x - ibody.x))/r;
            sum_fy += (f*(jbody.y - ibody.y))/r;
          } // end if statement
      } // end j loop
      fx[i] = sum_fx;
      fy[i] = sum_fy;
  } // end first i loop

  for (let i = 0; i < config.bodies.length; i++) {
    let body = config.bodies[i];
    let vx = body.vx;
    let vy = body.vy;
    let x = body.x;
    let y = body.y;


    let ax = fx[i]/body.m;
    let ay = fy[i]/body.m;

    vx += ax*deltaT;
    vy += ay*deltaT;

    x += vx*deltaT;
    y += vy*deltaT;

    config.bodies[i].x = x;
    config.bodies[i].y = y;
    config.bodies[i].vx = vx;
    config.bodies[i].vy = vy;
  }
  // end second i loop

  for (let i = 0; i < config.bodies.length; i++) {
    contextWrapper.drawImage(config.bodies[i].image, config.bodies[i].x, config.bodies[i].y)
  }
};

// End your code

export { step, config };

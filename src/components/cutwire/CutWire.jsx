import { ReactP5Wrapper } from "@p5-wrapper/react";

function sketch(p5) {
    let permissionGranted = false;
    let cx, cy;
    let redHeight, redY;
    let cut = false;

    p5.setup = () => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight);
        
        cx = p5.width/2;
        cy = p5.height/2;
        
        // DeviceOrientationEvent, DeviceMotionEvent
        if (typeof(DeviceOrientationEvent) !== 'undefined' && typeof(DeviceOrientationEvent.requestPermission) === 'function') {
          // ios 13 device
          
          DeviceOrientationEvent.requestPermission()
            .catch(() => {
              // show permission dialog only the first time
              let button = p5.createButton("click to allow access to sensors");
              button.style("font-size", "24px");
              button.center();
              button.mousePressed( requestAccess );
              throw error;
            })
            .then(() => {
              // on any subsequent visits
              permissionGranted = true;
            })
        } else {
          // non ios 13 device
          p5.textSize(48);
          // text("non ios 13 device", 100, 100);
          permissionGranted = true;
        }
        
        p5.background(255);
      }
      
      function requestAccess() {
        DeviceOrientationEvent.requestPermission()
          .then(response => {
            if (response == 'granted') {
              p5.permissionGranted = true;
            } else {
              p5.permissionGranted = false;
            }
          })
        .catch(console.error);
        
        this.remove();
      }
      
    p5.draw = () => {
        p5.clear();
        p5.background(0);
        
        if (!permissionGranted) return;
        
        // background(255);
        
        // rotationX, rotationY
        const dx = p5.constrain(2 * p5.rotationY, -3, 3);
        const dy = p5.constrain(2 * p5.rotationX, -3, 3);
        cx += dx*2;
        cy += dy*2;
        cx = p5.constrain(cx, 0, p5.width);
        cy = p5.constrain(cy, 0, p5.height);
        
        // camera
        p5.fill('white');
        p5.ellipse(cx, cy, 200, 200);
        
        // the wire
        p5.fill('blue');
        p5.rect(p5.width/2 - 20, cy-99, 40, 198);

        const redFullHeight = 80;
        
        if(cy-99 > p5.height*5/6 - redFullHeight) {
          redHeight = redFullHeight - ((cy-99) - (p5.height*5/6 - redFullHeight));
          redY = cy-99;
        } else {
          redHeight = redFullHeight - (p5.height*5/6) + (cy-99+198);
          redY = p5.height*5/6 - redFullHeight;
        }
        redHeight = p5.constrain(redHeight, 0, redFullHeight);
        
        if(cut) {
          p5.fill('white');
        } else {
          p5.fill('red');
        }
        p5.rect(p5.width/2 - 20, redY, 40, redHeight);
        
      }
      
      p5.mousePressed = () => {
        if((p5.mouseX >= p5.width/2 - 20 && p5.mouseX <= p5.width/2+20) && (p5.mouseY >= redY && p5.mouseY <= redY + redHeight)) {
          cut = true;
        }
      } 
}

const CutWire = () => {
    return (
        <div>
            <ReactP5Wrapper sketch={sketch}></ReactP5Wrapper>
        </div>
    );
}

export default CutWire;
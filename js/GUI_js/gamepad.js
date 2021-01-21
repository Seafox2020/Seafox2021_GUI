var last_value=0;


window.addEventListener("gamepadconnected", event => {
  //console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.", gp.index, gp.id, gp.buttons.length, gp.axes.length); 
  var led_gp = document.getElementById("led_gamepad");
  if (led_gp.classList.contains("leds_off")) {
      led_gp.classList.replace("leds_off","leds_on");
    }
    updateGamepad();
  });

window.addEventListener("gamepaddisconnected", event => {
  var led_gp = document.getElementById("led_gamepad");
  if (led_gp.classList.contains("leds_on")) {
  led_gp.classList.replace("leds_on","leds_off");
  }
});


function updateGamepad(last_value) {
  const gamepad = navigator.getGamepads()[0];
  //if (!gamepad) return;

  //var axes = gamepad.axes;
  var buttons = gamepad.buttons;
  /*
  Valores para el gamepad generico del rov marca  Logitech

  axes[0] = Joystick izquierdo, eje x
  axes[1] = Joystick izquierdo, eje y invertido-(que pa arriba es -1)
  axes[2] = Joystick derecho, eje x
  axes[3] = Joystick derecho, eje y invertido
  button[0] = boton a
  button[1] = boton b
  button[2] = boton x
  button[3] = boton y
  button[4] = boton lb
  button[5] = boton rb
  button[6] = trigger lt
  button[7] = trigger rt
  button[8] = boton back
  button[9] = boton start
  button[10] = boton joystick izquierdo
  button[11] = boton joystick derecho
  button[12] = D-pad up
  button[13] = D-pad down
  button[14] = D-pad left
  button[15] = D-pad right

  la manera en la que funcionan los botones es que estan compuesto por un arreglo de tres elementos
  1.- pressed(boolean): cuando se presiona el boton
  2.- touched(boolean): cuando se toca el boton XD creo que no tiene mucha importancia para nuestros controles
  3.- value(float): para los botones es valor de 0 cuando no se presiona o 1 cuando se presiona, en el caso
  de los triggers que son considerados botones dentro de esta api arrojara un valor analogo entre 0 y 1 
  de acuerdo a la fuerza ejercida sobre el joystick

  example: buttons[6].value = float value
  */
 //var x = parseFloat(buttons[0])
  moveAction(buttons[0].value,0);
  requestAnimationFrame(updateGamepad);

}

var twist;
var cmdVel;
var publishImmidiately = true;
var robot_IP;
var manager;
var teleop;
var ros;


//----------------------------------------------------------------
function moveAction(linear, angular) {
    if (linear !== undefined && angular !== undefined) {
        twist.linear.x = linear;
        twist.angular.z = angular;
    } else {
        twist.linear.x = 0;
        twist.angular.z = 0;
    }
    cmdVel.publish(twist);
}

function initVelocityPublisher() {
    // Init message with zero values.
    twist = new ROSLIB.Message({
        linear: {
            x: 0,
            y: 0,
            z: 0
        },
        angular: {
            x: 0,
            y: 0,
            z: 0
        }
    });
    // Init topic object
    cmdVel = new ROSLIB.Topic({ 
        ros: ros,
        //name: '/cmd_vel',
        name: '/cmd_vel',
        messageType: 'geometry_msgs/Twist'
    });
    // Register publisher within ROS system
    cmdVel.advertise();
}

window.onload = function () {
  // robot_IP = location.hostname;
  // set robot address statically
  robot_IP = "192.168.1.84";

  // // Init handle for rosbridge_websocket
  ros = new ROSLIB.Ros({
      url: "ws://" + robot_IP + ":9090"
  });

  initVelocityPublisher();

}


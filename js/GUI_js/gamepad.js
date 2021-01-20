window.addEventListener("gamepadconnected", function(e) {
  var gp = navigator.getGamepads()[e.gamepad.index];
  //console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.", gp.index, gp.id, gp.buttons.length, gp.axes.length);
    
  var led_gp = document.getElementById("led_gamepad");
  if (led_gp.classList.contains("leds_off")) {
      led_gp.classList.replace("leds_off","leds_on");
    }
  }
);

window.addEventListener("gamepaddisconnected", function(e) {

  var led_gp = document.getElementById("led_gamepad");
  if (led_gp.classList.contains("leds_on")) {
  led_gp.classList.replace("leds_on","leds_off");
  }
});

function updateGamepad() {
  requestAnimationFrame(updateGamepad);
    const gp = navigator.getGamepads()[0];
    if (!gp) return;

    console.log(gp.axes[0])
}


updateGamepad();
console.clear();


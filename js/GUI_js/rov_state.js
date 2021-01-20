function  rov_state(){
    var cambio = document.getElementById("en-de-indicator");
      if (cambio.classList.contains("disable-indicator")) {
        cambio.classList.replace("disable-indicator","enable-indicator");
        cambio.innerHTML="ENABLE"
      } 
      else {
        cambio.classList.replace("enable-indicator","disable-indicator");
        cambio.innerHTML="DISABLE"
      } 
    } 

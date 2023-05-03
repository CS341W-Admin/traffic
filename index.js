const sequence = [
  { color: "green", duration: 5000 },
  { color: "yellow", duration: 2500 },
  { color: "red", duration: 5000 },
]

let signalSpeed = "normal"
let lightIsActive = false

function changeLightColor(light, color, duration) {
  return new Promise((resolve, reject) => {
    try {
      swapClass(light, `dark${color}`, color)
      setTimeout(() => {
        swapClass(light, color, `dark${color}`)
        resolve()
      }, duration)
    } catch (err) {
      reject(err)
    }
  })
}

// THIS CODE IS FAULTY! CAN YOU MAKE IT BETTER?
function runTrafficLightSequence() {
  try {
    changeLightColor(document.querySelector("#green"), sequence[0].color, 5000)
    changeLightColor(document.querySelector("#yellow"), sequence[1].color, 3000)

    if (lightIsActive === true) {
      runTrafficLightSequence() // Runs recursively and DOESN'T WAIT, overflowing the call stack!
    } else {
      throw new Error("You clicked the stop button!")
    }
  } catch (err) {
    console.log(err.message || err)
  }
}

/*   ALTERNATIVE - Could you leverage this pattern instead?
     for (let obj of sequence) {
      if (lightIsActive === true) {
        let { color, duration } = obj
        const elem = document.querySelector(`#${color}`)
        duration = signalSpeed === "normal" ? duration : duration / 2
        // Call the changeLightColor() function using Async/Await syntax
      }
    }
 */

const swapClass = (elem, remClass, addClass) => {
  elem.classList.remove(remClass)
  elem.classList.add(addClass)
}

document.querySelectorAll("button").forEach((elem) => {
  elem.addEventListener("click", (event) => {
    if (event.target.id === "stopBtn") {
      lightIsActive = false
    } else if (lightIsActive === false) {
      lightIsActive = true
      runTrafficLightSequence()
    }
  })
})

document.querySelectorAll("input[name='traffic']").forEach((radioBtn) => {
  radioBtn.addEventListener("change", (event) => {
    signalSpeed = event.target.id
  })
})

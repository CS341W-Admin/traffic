# Traffic Light Fun
## Exercise Overview
The City of Santa Clarita hired a developer to program its traffic lights. Unfortunately, this developer wrote horrible code and then left to work for a startup. You have been brought in as a consultant to fix the faulty program. 

### Current Situation
The main function `runTrafficLightSequence()` is called recursively, meaning that its body includes a new call to itself `runTrafficLightSequence()`, such that this function should run in a continuous loop until made to stop. This is not a mistake! It is how the program is designed to work. But read on...

```
function runTrafficLightSequence() {
  try {
    changeLightColor(document.querySelector("#green"), sequence[0].color, 5000)
    changeLightColor(document.querySelector("#yellow"), sequence[1].color, 3000)    
    if (lightIsActive === true) {
      runTrafficLightSequence() // <== This runs recursively and DOESN'T WAIT, overflowing the call stack!
    } else {
      throw new Error("You clicked the stop button!")
    }
 } catch(err) { ...
```
The `changeLightColor()` function returns a Promise that leverages the `setTimeout()` Web API to give each light its active duration (i.e., how long it remains lit).
```
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
```
__The problem is that your main function is not handling the asynchronous events with blocking behavior.__ You could use callbacks, promise chaining, or even better, async/await syntax. Whichever way, you must ensure that each asynchronous event finishes running before kicking off the next one. For if this recursive loop runs unregulated, the call stack will continue to fill up, causing your program to crash. 

### Your Job
1. Instantiate a local repository and open it in VSCode. 
2. Analyze the overall program to understand how things are supposed to be working.
3. Revise and test the code, ensuring that you're meeting the requirements provided below.
4. Push your development branch back up to GitHub and submit a pull request. 

## Requirements
1. The `index.html` file must properly reference the needed JavaScript and CSS files. 
```
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- Supply the missing stylesheet and JavaScript links here -->
    <title>Traffic Signal</title>
  </head>
```
2. The light sequence must kick off when the user presses the "Start" button.
3. The light sequence must cease when the user presses the "Stop" button. (Note: It is OK that the active light takes a moment to finish.)
4. The lights must turn on and off according to instructions in the `sequence` array. _NOTE: The duration should not be hard-coded in your function; you must look up the values from this array_:
```
const sequence = [
  { color: "green", duration: 5000 },
  { color: "yellow", duration: 2500 },
  { color: "red", duration: 5000 },
]
```
5. The lights must complete the full cycle repeatedly and continuously without overflowing the call stack. 
6. The duration of each light should become 50% shorter (i.e., twice as fast) when the Signal Speed radio button is set to "fast"; it should return to normal when the "normal" radio button is selected.
7. The `changeLightColor()` promise-based function must be in __its own .js file__ and accessed by the `index.js` file through ES6-style module export/import.




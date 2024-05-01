# 🚦 Traffic Light Fun
## Exercise Overview
The City of Santa Clarita hired a developer to program its traffic lights. Unfortunately, this developer wrote terrible code and then left to work for a startup. You have been brought in as a consultant to fix the faulty program. 

### Open Book / Open AI
CoPilot for VSCode is permitted, as is consulting ChatGPT, Gemini, and other AI tools. You may also consult official documentation (e.g., MDN Web Docs), Stack Overflow, and other internet sources. However, you __may not get outside human assistance__, which includes consulting other people during the exam or using the solution code provided by others who have completed this exercise before. 

### Exercise Scoring
This exercise is worth 150 points, weighted as follows:
- __15% — Adherence to Git/GitHub procedures__, including dev branching and pull request submission
- __15% — Setup of HTML page__, including proper boilerplate elements and linking of stylesheet and main JS file
- __40% — JavaScript code__, including proper use of ES6 modules, event handling, async code, object handling, and scope management
- __30% — Overall solution completeness and effectiveness__, as shown by meeting the requirements outlined below

### Getting Started
Follow the instructions under [Getting Started](#getting-started--one-time-repo-configuration) to clone this repository and set up a dev branch.

### Current Situation
The JavaScript is not properly wired up to the HTML. Once you fix that, you'll quickly notice a problem with code execution. The `runTrafficLightSequence()` function calls the `changeLightColor()` function successively for each light color, then the `runTrafficLightSequence()` will call itself (recursion) so that the cycle repeats -- over and over again. Unfortunately, the __non-blocking__ nature of this code and the use of __recursion__ are causing the `changeLightColor()` function to fire without regulation. The call stack is overflowing and the application is failing. 

```
function runTrafficLightSequence() {
  try {
    changeLightColor(document.querySelector("#green"), sequence[0].color, 5000)
    changeLightColor(document.querySelector("#yellow"), sequence[1].color, 3000)  //<== Yellow not waiting for green!
    if (lightIsActive === true) {
      runTrafficLightSequence() // <== This calls the function within itself (recursion), but the stack overflows!
    } else {
      throw new Error("You clicked the stop button!")
    }
 } catch(err) { ...
```
The `changeLightColor()` function institutes a `setTimeout()` delay before changing a light to its on/off value (by leveraging a CSS class name). This function is __promise-based__, meaning it eventually gets "settled" with either a `resolve()` or `reject()` value. You will call this function three times (once for each light color) to complete one full traffic light sequence. The sequence should continue repeating so long as the `lightIsActive` variable equals Boolean `true`.
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
__The problem, again, is that `runTrafficLightSequence()` is not handling this asynchronous event with blocking behavior.__ You could fix that by using callbacks, promise chaining, or even better, async/await syntax. Regardless of your approach, you must ensure that each call to the asynchronous function finishes running before the next one kicks off.

### Using a Loop (Optional)
When rewriting the `runTrafficLightSequence()` function, you might choose to iterate over the `sequence` array instead of coding out successive calls to `changeLightColor()`. 
```
const sequence = [
  { color: "green", duration: 5000 },
  { color: "yellow", duration: 2500 },
  { color: "red", duration: 5000 },
]
```
You could also change `sequence` into an Object (instead of an Array). Weigh the pros and cons regarding patterns for iteration.
```
// REWRITE OPTION...
const sequence = {
  green: { color: "green", duration: 5000 },
  yellow: { color: "yellow", duration: 2500 },
  red: { color: "red", duration: 5000 },
}
```

### Your Job
1. Instantiate a local repository and open it in VSCode. 
2. Analyze the overall program and read the "Requirements" section below to understand how things are supposed to be working.
3. Revise and test the code, ensuring that you're meeting the requirements provided below.
4. Push your development branch back to GitHub and submit a pull request. 

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
4. The duration for each light (i.e., how long between active and inactive) must be driven according to instructions in the `sequence` array. _NOTE: The duration should not be 'hard-coded' into your function code; you must look up the values from this array_:
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

### Submitting Your Code
Follow the instructions below for [Submitting Your Code via GitHub](#submitting-your-code-via-github). Upon submittal, the instructor will do the following: 
- Review your code and make any comments on your pull request
- Merge the accepted code into the "main" branch of the remote repo on GitHub
- Close the pull request 

## Getting Started — One-Time Repo Configuration

   *NOTE: To execute these steps, you can use the terminal window in VSCode, the standard terminal app (Mac) or command prompt (Windows), or a popular third-party terminal emulator (e.g., iTerm2 for Mac, PuTTy or PowerShell for Windows).*

1. Make sure you have Git installed on your local machine. You can check by typing this command in the terminal window:
    ```
    git -v
    ```
2. If the git command is not recognized, then download and install Git for your respective operating system (Mac, Windows, etc.):
    [link to Git download page](https://git-scm.com/downloads)

3. Create a project dev folder called "traffic".

    *NOTE: This is where the code project will be housed. You can create this folder by using VSCode's built in folder utility, the File Explorer (Windows), or the Finder (Mac). Alternatively, you can create it from the terminal window (like a boss) as follows.*  
    - Run `pwd` to reveal the current folder path. *Move to the desired directory/folder within the terminal shell, as needed.* 
    - Run `mkdir traffic`. *The folder is created.*
    - Run `cd traffic`. *You are now in the new folder.* 

4. Clone the GitHub assignment repo into your new project dev folder:
    ```
    git clone --single-branch --branch main [assignment repo url] .
    ```
    *NOTE: Be certain to replace this — `[assignment repo URL]` — with your actual GitHub repo URL for this assignment, and **do not forget the trailing space and period**, which tells Git to use the current folder. For example:* 
    > `git clone --single-branch --branch main https://github.com/CS122J/traffic-John-Doe .`

5. Create a new branch called "dev-traffic" and perform a check-out with the following one-line command:
    ```
    git checkout -b dev-traffic
    ```
**Conclusion:** You are now ready to work in the "dev-traffic" branch of your local repository. When you have finished making code changes and are ready to submit this assignment, then proceed to *Submitting Your Code via GitHub* below.

## Submitting Your Code via GitHub

1. Confirm that you're on the "dev-traffic" branch. If you're unsure, then use the following commands to a) see what branch you're on, and b) switch to "dev-traffic": 
    ```
    git branch
    git checkout dev-traffic
    ```
2. Make sure any new files have been added to the local repo. Use `git add`... to add files/folders selectively, or use the global command (trailing dot):
   ```
   git add .
   ```
3. Commit any recent changes within your local repo — Do this *before* pushing your code:
   ```
   git commit -a -m "[your custom message]"
   ```
    *NOTE: Remember to replace this `[your custom message]` with your own message, such as, "Adding new code for traffic."*

4. Push your code to the "dev-traffic" branch on the remote GitHub repository.

    *NOTE: If this is a first-time push, this action results in creation of the branch at the remote repo (GitHub) level; otherwise, this updates the existing "dev-traffic" branch on the remote repo.*
    ```
    git push origin dev-traffic
    ```
5. Go to [https://github.com](https://github.com) and access this repo. 

    *NOTE: Your repo should appear in the left column when you log in. For more direct access, just follow the URL for this repo.* 
    
6. Perform the following steps to target your pull request: 
    - Click the "Pull requests" top menu link. *The Pull Requests panel appears.* 
    - Click the "New pull request" button. *The Compare Changes panel appears.*
    - Click the "compare" drop down-menu button. *A list of active branches appears.*
    - Click the "dev-traffic" branch name. *GitHub automatically evaluates the selected branch against the main branch for any conflicts. If there are no conflicts, then a green "able to merge" message is displayed.*
    - Click the "Create pull request" button. *The "Open a pull request" input panel appears.*
7. Perform the following steps to finalize and submit your pull request:
    - Type a brief 1-line description for the request, such as, "Submitting code for Traffic Light Fun."
    - (Optional) Use the "Write" textbox to leave any comments or questions about this exercise.
    - Click the "Submit" button.

**Conclusion:** You have completed the steps necessary to submit your code. 


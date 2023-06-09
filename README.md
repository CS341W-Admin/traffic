# 🚦 Traffic Light Fun
## Exercise Overview
The City of Santa Clarita hired a developer to program its traffic lights. Unfortunately, this developer wrote horrible code and then left to work for a startup. You have been brought in as a consultant to fix the faulty program. 

### Exercise Scoring
This exercise is worth 75 points, weighted as follows:
- __15% — Adherence to Git/GitHub procedures__, including dev branching and pull request submission
- __15% — Setup of HTML page__, including proper boilerplate elements and linking of stylesheet and main JS file
- __40% — JavaScript code__, including proper use of ES6 modules, event handling, async code, object handling, and scope management
- __30% — Overall solution completeness and effectiveness__, as shown by meeting the requirements outlined below

### Getting Started
Follow the instructions under [Getting Started](#getting-started--one-time-repo-configuration) to clone this repository and set up a dev branch.

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
The `changeLightColor()` function returns a Promise that leverages the `setTimeout()` Web API to give each light its active duration (i.e., how long it remains lit). This function needs to be called three times (once for each light color) to complete a full sequence.
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
__The problem is that your main function is not handling the asynchronous events with blocking behavior.__ You could use callbacks, promise chaining, or even better, async/await syntax. Whichever approach you choose, you must ensure that each asynchronous event finishes running before kicking off the next one. For if this recursive loop runs unregulated, the call stack will continue to fill up, causing your program to crash. 

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
    git status
    ```
2. If the git command is not recognized, then download and install Git for your respective operating system (Mac, Windows, etc.):
    [link to Git download page](https://git-scm.com/downloads)

3. Create a project dev folder called "traffic".

    *NOTE: This is where the code project will be housed. If you're on a Mac, then you should create this folder within the 🔨 Developer folder. If you're on Windows, you might want to create your dev folder somewhere within your Documents directory. You can create this folder by using the File Explorer (Windows) or the Finder (Mac). Alternatively, you can create it from the terminal window (like a boss) as follows.*  
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

1. Confirm that you're on the "dev-traffic" branch. If you're not sure, then use the following commands to a) see what branch you're on, and b) switch to "dev-traffic": 
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
5. Log in at [https://github.com](https://github.com) and access this repo. 

    *NOTE: Your repo should appear in the left column when you log in. For more direct access, just follow the URL for this repo.* 
    
6. Perform the following steps to target your pull request: 
    - Click the "Pull requests" top menu link. *The Pull Requests panel appears.* 
    - Click the "New pull request" button. *The Compare Changes panel appears.*
    - Click the "compare" drop down-menu button. *A list of active branches appears.*
    - Click the "dev-traffic" branch name. *GitHub automatically evaluates the selected branch against the main branch for any conflicts. If there are no conflicts, then a green "able to merge" message is displayed.*
    - Click the "Create pull request" button. *The "Open a pull request" input panel appears.*
7. Perform the following steps to finalize and submit your pull request:
    - Type a brief 1-line description for the request, such as, "Submitting code for Traffic Light Fun."
    - Use the "Write" textbox to leave any comments or questions about this exercise.
    - Click the "Submit" button.

**Conclusion:** You have completed the steps necessary to submit your code. 


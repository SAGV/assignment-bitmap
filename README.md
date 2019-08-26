# Test assignment with BFS and Typescript

The idea is to have a 2-dimensional array filled with white and black pixels. And be able to find the closest distance to a white pixel for each black pixel. You can find more details about the assignment [here](http://code-jedi.chintanghate.me/2014/11/28/bitmap/) (however, do not look on the solution there. It is elegant but quite slow as it appears to be).

## Watch the video first!

I've made [a video](https://youtu.be/n8WoFJQkKI8) with explanations of why this solution is chosen, how it works and why is it faster than what can be found over the web.

* [00:00](https://youtu.be/n8WoFJQkKI8?t=0) — Intro
* [00:56](https://youtu.be/n8WoFJQkKI8?t=56) — The challenge explained
* [03:50](https://youtu.be/n8WoFJQkKI8?t=230) — Solutions found around the web
* [08:25](https://youtu.be/n8WoFJQkKI8?t=505) — Benchmarking my solution vs the one found
* [11:00](https://youtu.be/n8WoFJQkKI8?t=660) — Validation
* [13:15](https://youtu.be/n8WoFJQkKI8?t=795) — Input parsing and structure
* [15:15](https://youtu.be/n8WoFJQkKI8?t=915) — Actual BFS implementation and explanation
* [18:20](https://youtu.be/n8WoFJQkKI8?t=1100) — Testing and linting


## Prerequirements

1. Make sure you have Node, npm and typescript installed globally. Preferred is Node v10.
2. Download or clone this repo
3. Run `npm install` to get all the dependencies

## Testing

Right after you've cloned the repo and installed dependencies, it is wise to run tests and see how it works. Run `npm run test` to test once or `npm run autotest` to keep Mocha rerunning tests after every change.

The tests are made with `Mocha` and `Chai` frameworks.

## Building

If you want to build the app without running, run `npm run build`

## Running

To build and run, type `npm run start < <YOUR_TEST_DATA>`. It will clean up the old build, compile the code and process the file. 

Use `testData.txt` to try the program (like `npm run start < testData.txt`) and if your test file fails, compare this file to yours to find the difference. Even though, the app has a bit of validation build in and will try to help you finding the error.

## Other things to note

This repo is using eslint (with typescript addons) and prettier to automatically lint the code.
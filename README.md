# NoScroll

## Table of Contents

+ [About](#about)
+ [How to install](#how-to-install)
+ [Current features](#current-features)
+ [Currently supported browsers](#currently-supported-browsers)
+ [Help development](#help-development)


## About
Any time I open instagram to simply text friends, I always find myself eventually scrolling. For that reason, I decided to build NoScroll, an extension that aims at reducing scrolling addiction.

NoScroll is a content blocker for Instagram available for Firefox. With a simple popup UI, you can toggle on/off distracting elements such as Stories, Reels and Explore page.

## How to Install

- Install NoScroll like any other extension via Firefox's addons website. You can find the extension here: [NoScroll for Firefox](https://addons.mozilla.org/en-US/firefox/addon/noscrollinstagram/)
- Alternatively you can download the latest version from the `Releases` tab: [NoScroll for Firefox](https://github.com/Lem0n3de8/NoScroll/releases)
    - To install web extensions from file, go to `about:addons` and select `Install add-on from file` in the gear icon at the top right.

## Current Features:
Contains a simple popup user interface to toggle settings:
```add ui_preview.png```

| Setting                  | Description |
| ------------------------ | ------------------------ |
| sidebar reels icon       | Hide the reel icon from the left sidebar |
| sidebar explore icon     | Hide the explore icon from the left sidebar |
| home page stories        | Hide the stories at the top of the Home page |
| redirect `/reels` page   | Redirect any URL containing `instagram/reels` to `instagram.com` |
| redirect `/explore` page | Redirect any URL containing `instagram/explore` to `instagram.com` |
| void mode                | Turn the page blank |

## Currently Supported Browsers

This add-on is only available for Firefox. Any fork should work. Below is a detailed list of supported browsers

| Browser | yes | no | unknown |
| ------- | --- | -- | ------- |
| Firefox |  x  |    |         |
| Zen     |  x  |    |         |


## Help Development

### Contributions
To submit a pull request you need to first 

Suggested Improvements:
- Test the extension on other browsers
- Improve popup CSS

### Submit an Issue
To submit an issue, check the [issues tab](https://github.com/Lem0n3de8/NoScroll/issues).

----

**Early development** — features and behavior may change.
# Contributing to NoScroll

## Introduction
Welcome! If you are interested in contributing in any way to this extension, please read this document.

## Table of content
- [Working on the project](#working-on-the-project)
    - [1. Setting up the development environment](#1-setting-up-the-development-environment)
    - [2. Creating a branch](#2-creating-a-branch)
    - [3. Code style](#3-code-style)
    - [4. Testing the changes](#4-testing-the-changes)
    - [5. Opening a pull request](#5-opening-a-pull-request)
- [Reporting bugs and requesting features](#reporting-bugs-and-requesting-features)
- [Suggested contributions](#suggested-contributions)
- [Questions](#questions)

## Working on the project
Development should follow these important steps:
- Fork and clone your fork
- Make changes
- Verify changes work as intended
- Open a Pull Request

### 1. Setting up the development environment
Once you have an idea for a feature or a bugfix, you have to fork the repository (see [Github's documentation](https://docs.github.com/en/pull-requests/how-tos/work-with-forks/fork-a-repo) on working with forks) then clone the fork on your machine

You will need Git and a Firefox based browser for development and testing.
```bash
git clone https://github.com/<your-username>/NoScroll.git
cd NoScroll
```

### 2. Creating a branch

**Branch naming convention**

Please use the following list as an example for the name of your branch depending on the added content type:
- `feature/add-setting`
- `fix/popup-layout`
- `docs/update-readme`
- ...


Create a new branch for your changes and start working on it
```bash
git switch -c <branch name>
```

### 3. Code style
There is no specific formatter or linter to use for this project. Follow the style already used in the surrounding code and keep changes consistent with the existing project.

### 4. Testing the changes
First, you need to load the extension in your browser. For firefox based browsers, follow these steps:
- Go to `about:debugging` in the URL bar
- Click on `This Firefox` in the left hand menu
- Click on the `Load Temporary Add-on...` button
- Go to the directory where you made your changes (most likely `NoScroll`)

The extension should be loaded in your browser

Depending on the changes you've made, testing may vary, but the following steps must be included:
- Verify that the popup is displayed as expected and reflects the changes you made
- Verify that the affected webpage and UI elements are displayed as expected and reflect the changes you made
- Verify that no undesired effects have appeared

Once these changes pass, you're ready to open a pull request!

### 5. Opening a pull request
Once you are satisfied with the changes you've made and you checked that the code works, you can open a pull request(PR) to request your code to be merged to this repository.

1. Go to the [PR tab](https://github.com/Lem0n3de8/NoScroll/pulls) of the NoScroll repository.
2. You should see a button to create a PR for your branch.
3. Click on it and describe the changes you've made.
4. Submit your PR and wait for eventual comments/reviews.


## Reporting bugs and requesting features
If you've encountered some unexpected behavior while using this extension, or you'd like a new feature, [open an issue](https://github.com/Lem0n3de8/NoScroll/issues) and describe your issue/request.

## Suggested contributions
- Refactor or simplify existing code
- Test browser compatibility
- Make changes to popup CSS and UI
- Improve documentation
- New features


## Questions
If you have a question after reading this document, or at any stage during development, feel free to open an issue and ask for help.

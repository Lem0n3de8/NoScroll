# Contributing to NoScroll

## Introduction
Welcome! If you are interested in contributing in any way to this extension, please read this document.


## Working on the project
Development should follow these important steps:
- Fork and clone your fork
- Make changes
- Verify changes work as intended
- Open a Pull Request

### 1. Setting up the development environment
Once you have an idea for a feature or a bugfix, you have to fork the repository (see [here](https://docs.github.com/en/pull-requests/how-tos/work-with-forks/fork-a-repo) for help on how to fork a repository) then clone the fork on your machine
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


Create a branch for yourself and start working on your changes
```bash
git switch -c <branch name>
```

### 3. Code style
There is no specific formatter or linter to use for this project. Follow the style already used in the surrounding code and keep changes consistent with the existing project.

### 4. Testing the changes
Depending on the changes you've made, testing may require different steps but should follow this general procedure:
- Verify that the popup is displayed as expected and reflects the changes you made
- Verify that the affected webpage and UI elements are displayed as expected and reflect the changes you made
- Verify that no undesired effects have appeared

If these checks are OK, you can open a pull request!

### 5. Opening a pull request
Once you are satisfied with the changes you've made and you checked that the code works, you can open a pull request(PR) to request your code to be merged to this repository.

1. Go to the [PR tab](https://github.com/Lem0n3de8/NoScroll/pulls) of this repository.
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

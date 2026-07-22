/*
    Process:
        0. Retrieve the form object
        1. Load saved data whe opening the form
        2. Listen for any form submission
        3. Save the new data in the local storage
        4. Call the appropriate functions

*/

// 0. Get the Form
const settingsForm = document.getElementById("settings-form");

const voidModeCheck = document.getElementById("void-mode-check");

const sideReelsCheck = document.getElementById("side-reels-check");
const sideExploreCheck = document.getElementById("side-explore-check");
const homeStoriesCheck = document.getElementById("home-stories-check");
const redirectReelsCheck = document.getElementById("redirect-reels");
const redirectExploreCheck = document.getElementById("redirect-explore");

// 1. Load the saved data when opening the form
async function loadFormFromLocalStorage(){
    try{
        settings = await browser.storage.local.get([
            "voidMode",

            "sideReels",
            "sideExplore",
            "homeStories",
            "redirectReels",
            "redirectExplore"
        ])
        console.log("Loaded settings:", settings);

        voidModeCheck.checked = settings.voidMode ?? false;

        sideReelsCheck.checked = settings.sideReels ?? false;
        sideExploreCheck.checked = settings.sideExplore ?? false;
        homeStoriesCheck.checked = settings.homeStories ?? false;
        redirectReelsCheck.checked = settings.redirectReels ?? false;
        redirectExploreCheck.checked = settings.redirectExplore ?? false;
    }catch(error){
        console.log(error);
    }
}

loadFormFromLocalStorage();


// 2. Listen for form submission

settingsForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    await saveFormToLocalStorage(formData);
});

async function saveFormToLocalStorage(formData) {
    try {
        const voidMode = voidModeCheck.checked;

        const sideReels = sideReelsCheck.checked;
        const sideExplore = sideExploreCheck.checked;
        const homeStories = homeStoriesCheck.checked;
        const redirectReels = redirectReelsCheck.checked;
        const redirectExplore = redirectExploreCheck.checked;

        console.log({
            voidMode,

            sideReels,
            sideExplore,
            homeStories,
            redirectReels,
            redirectExplore
        });

        await browser.storage.local.set({
            voidMode,

            sideReels,
            sideExplore,
            homeStories,
            redirectReels,
            redirectExplore
        });

        console.log("Settings saved!");
    }catch(error){
        console.log(error);
    }
}
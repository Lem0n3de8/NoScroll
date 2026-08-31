// Get form inputs
const settingsForm = document.getElementById("settings-form");
const voidModeCheck = document.getElementById("void-mode-check");
const homeStoriesCheck = document.getElementById("home-stories-check");
const homeFeedCheck = document.getElementById("home-feed-check");
const grayScaleCheck = document.getElementById("gray-scale-check")
const hideCommentsCheck = document.getElementById("hide-comments-check");

// Load the saved data
async function loadFormFromLocalStorage(){
    try{
        settings = await browser.storage.local.get([
            "homeStories",
            "homeFeed",
            "grayScale",
            "voidMode",
            "hideComments"
        ])
        console.log("Loaded settings");

        homeStoriesCheck.checked = settings.homeStories ?? false;
        homeFeedCheck.checked = settings.homeFeed ?? false;
        grayScaleCheck.checked = settings.grayScale ?? false;
        voidModeCheck.checked = settings.voidMode ?? false;
        hideCommentsCheck.checked = settings.hideComments ?? false;
    }catch(error){
        console.log(error);
    }
}


// Listen for form update (ie: user saves settings)
settingsForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    await saveFormToLocalStorage(formData);
});


// Save settings in local storage
async function saveFormToLocalStorage(formData) {
    try {
        
        const homeStories = homeStoriesCheck.checked;
        const homeFeed = homeFeedCheck.checked;
        const grayScale = grayScaleCheck.checked;
        const voidMode = voidModeCheck.checked;
        const hideComments = hideCommentsCheck.checked;

        await browser.storage.local.set({
            homeStories,
            homeFeed,
            grayScale,
            voidMode,
            hideComments
        });

        console.log("Settings saved!");

    }catch(error){
        console.log(error);
    }
}

// Initial load when popup appears
loadFormFromLocalStorage();
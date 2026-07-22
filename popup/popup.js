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

// 1. Load the saved data when opening the form
async function loadFormFromLocalStorage(){
    try{
        settings = await browser.storage.local.get([
            "sideReels",
            "sideExplore",
            "homeStories"
        ])
        console.log("Loaded settings:", settings);

        document.getElementById("side-reels-check").checked = settings.sideReels ?? true;

        document.getElementById("side-explore-check").checked = settings.sideExplore ?? true;

        document.getElementById("home-stories-check").checked = settings.homeStories ?? true;
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

    console.log("Apply button pressed");
});

async function saveFormToLocalStorage(formData) {
    try {
        const sideReels = document.getElementById("side-reels-check").checked;
        const sideExplore = document.getElementById("side-explore-check").checked;
        const homeStories = document.getElementById("home-stories-check").checked;

        console.log({
            sideReels,
            sideExplore,
            homeStories
        });

        await browser.storage.local.set({
            sideReels,
            sideExplore,
            homeStories
        });

        console.log("Settings saved!");
    }catch(error){
        console.log(error);
    }
}
// Target properties
const CONFIG = {
    instagramUrl: "https://www.instagram.com/",
    selectors:{
        homePageStories: '[data-pagelet="story_tray"]',
        reelsTab: 'a[href="/reels/"]',
        exploreTab: 'a[href="/explore/"]',
        loadingState: '[data-visualcompletion="loading-state"]',
        comments: '[aria-label="Comment"]',
        button: '[role="button"]'
    }
}

// Settings 
function setStoriesHidden(hidden) {
    const stories = document.querySelector(CONFIG.selectors.homePageStories);
    if (!stories) return;
    stories.classList.toggle("hidden-by-extension", hidden);
}

function hideHomeFeed(hidden){
    const posts = document.querySelectorAll("article");
    const loadingWheel = document.querySelector(CONFIG.selectors.loadingState);
    
    for (const post of posts){
        post.classList.toggle("hidden-by-extension", hidden);
    }
    // Remove the loading wheel
    if (loadingWheel) loadingWheel.classList.toggle("hidden-by-extension", hidden);
    
    // Disable scrolling 
    if (hidden) {
        document.body.style.setProperty("overflow", "hidden", "important");
    } else {
        document.body.style.removeProperty("overflow");
    }
}

function setGrayScale(enabled){
    // img -> profile pictures, image posts 
    const imgs = document.querySelectorAll("img");
    for (const img of imgs){
        img.classList.toggle("apply-grayscale", enabled);
    }
    // video -> video posts
    const videos = document.querySelectorAll("video");
    for (const video of videos){
        video.classList.toggle("apply-grayscale", enabled);
    }
    // button -> image post page button
    const buttons = document.querySelectorAll("button");
    for (const button of buttons){
        button.classList.toggle("apply-grayscale", enabled);
    }
    // svg -> repost blue icon
    const svgs = document.querySelectorAll("svg");
    for (const svg of svgs){
        svg.classList.toggle("apply-grayscale", enabled);
    }
    // a -> hashtags
    const as = document.querySelectorAll("a");
    for (const a of as){
        a.classList.toggle("apply-grayscale", enabled);
    }
    // canvas -> story rainbow/green circle
    const canvases = document.querySelectorAll("canvas");
    for (const canvas of canvases){
        canvas.classList.toggle("apply-grayscale", enabled);
    }
}

function setVoidMode(enabled){
    const html = document.documentElement;
    if (html) html.classList.toggle("hidden-by-extension", enabled);
}

function hideComments(enabled){
    const comments = document.querySelectorAll(CONFIG.selectors.comments);
    const ul = document.querySelectorAll("ul")

    // Hide comment button
    for (const comment of comments){
        // Comment svg span
        const span = comment.closest('span');

        // Comment count span
        const nextSpan = span?.nextElementSibling?.matches('span')
            ? span?.nextElementSibling
            : null;

        span?.classList.toggle("hidden-by-extension", enabled);
        nextSpan?.classList.toggle("hidden-by-extension", enabled);
    }

    // Hide comments in posts
    if (window.location.href.includes('instagram.com/p')){
        ul[0].classList.toggle("hidden-by-extension", enabled);
    }
}

// Reels
function setReelsTabHidden(){
    const reelsTab = document.querySelector(CONFIG.selectors.reelsTab);
    if (!reelsTab) return;

    reelsTab.classList.add("hidden-by-extension");
}

function blockReelsPage() {
    if (window.location.href.includes('instagram.com/reels')){
        window.location.href = CONFIG.instagramUrl;
    }
}


function updateExplorePage(){
    console.log("ExplorePAGE:");
    if (!(location.pathname === "/explore/")){
        console.log("YOU ARE NOT ON EXPLORE PAGE");
        
        try{
            const loadingWheel = document.querySelector(CONFIG.selectors.loadingState);
            if (loadingWheel) loadingWheel.classList.remove("hidden-by-extension");
        }
        catch{
            return
        }
    }
    else{
        console.log("YOU ARE ON EXPLORE PAGE");
        const anchors = document.querySelectorAll("a");
        const loadingWheel = document.querySelector(CONFIG.selectors.loadingState);

        for (const anchor of anchors){
            if (anchor.href.includes("/p/")){
                anchor.classList.add("hidden-by-extension");
            } 
        }

        if (loadingWheel) loadingWheel.classList.add("hidden-by-extension");
    }
}



async function applySettings() {
    const settings = await browser.storage.local.get();
    
    const path = window.location.pathname;
    
    // Home page settings
    if (window.location.href === CONFIG.instagramUrl) {
        setStoriesHidden(settings.homeStories ?? false);
        hideHomeFeed(settings.homeFeed ?? false);
    }

    // User settings
    setVoidMode(settings.voidMode ?? false);
    setReelsTabHidden(settings.sideReels ?? false);
    setGrayScale(settings.grayScale ?? false);
    hideComments(settings.hideComments ?? false);

    // Auto enabled settings
    updateExplorePage();
    blockReelsPage();
}

browser.storage.local.onChanged.addListener((changes) =>{
    // When user settings change, rerun
    console.log("Detected changes", changes);
    applySettings();
})

let applyTimeout;

const observer = new MutationObserver(() => {
    clearTimeout(applyTimeout);

    applyTimeout = setTimeout(() => {
        applySettings();
    }, 100);
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});
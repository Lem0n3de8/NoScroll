const CONFIG = {
    instagramUrl: "https://www.instagram.com/",
    selectors:{
        homePageStories: '[data-pagelet="story_tray"]',
        reelsTab: 'a[href="/reels/"]',
        exploreTab: 'a[href="/explore/"]',
        loadingState: '[data-visualcompletion="loading-state"]'
    }
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

function blockReelsPage(hidden ) {
  if (hidden && window.location.href.includes('instagram.com/reels')) {
    window.location.href = CONFIG.instagramUrl;
  }
}

function blockExplorePage(hidden) {
  if (hidden && window.location.href.includes('instagram.com/explore')) {
    window.location.href = CONFIG.instagramUrl;
  }
}

function setStoriesHidden(hidden) {
    const stories = document.querySelector(CONFIG.selectors.homePageStories);
    if (!stories) return;

    stories.classList.toggle("hidden-by-extension", hidden);
}

function setReelsTabHidden(hidden){
    const reelsTab = document.querySelector(CONFIG.selectors.reelsTab);
    if (!reelsTab) return;

    reelsTab.classList.toggle("hidden-by-extension", hidden);
}

function setExploreTabHidden(hidden){
    const exploreTab = document.querySelector(CONFIG.selectors.exploreTab);
    if (!exploreTab) return;

    exploreTab.classList.toggle("hidden-by-extension", hidden);
}

function setVoidMode(enabled){
    const STYLE_ID = "instagram-void-mode";

    let style = document.getElementById(STYLE_ID);

    if (enabled) {
        if (!style) {
            style = document.createElement("style");
            style.id = STYLE_ID;
            style.textContent = `
                * {
                    display: none !important;
                }`
                
                ;
            document.head.appendChild(style);
        }
    } else {
        style?.remove();
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
    // canva -> story rainbow/green circle
    const canvases = document.querySelectorAll("canvas");
    for (const canvas of canvases){
        canvas.classList.toggle("apply-grayscale", enabled);
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

    // General settings
    setVoidMode(settings.voidMode ?? false);
    setReelsTabHidden(settings.sideReels ?? false);
    setExploreTabHidden(settings.sideExplore ?? false);
    blockReelsPage(settings.redirectReels ?? false);
    blockExplorePage(settings.redirectExplore ?? false);
    setGrayScale(settings.grayScale ?? false);

}

browser.storage.local.onChanged.addListener((changes) =>{
    console.log("Detected changes", changes);
    applySettings();
})

const observer = new MutationObserver(() => {
    applySettings();
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});
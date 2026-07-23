const CONFIG = {
    instagramUrl: "https://www.instagram.com/",
    selectors:{
        homePageStories: '[data-pagelet="story_tray"]',
        reelsTab: 'a[href="/reels/"]',
        exploreTab: 'a[href="/explore/"]',
        loadingState: '[data-visualcompletion="loading-state"]',
        homeFeedAttribute: 'role',
        homeFeedAttributeValue: 'presentation'
    }
}


function hideHomeFeed(hidden){
    const posts = document.querySelectorAll("article");
    const loadingWheel = document.querySelector(CONFIG.selectors.loadingState);

    const attribute = CONFIG.selectors.homeFeedAttribute;
    const attributeValue = CONFIG.selectors.homeFeedAttributeValue;
    
    for (const post of posts){
        // The posts in the home feed dont have the 
        // 'role="presentation"' attribute so we can
        // filter using that attribute

        if (!post.hasAttribute(attribute) && !(post.getAttribute(attribute) === attributeValue)){
            post.classList.toggle("hidden-by-extension", hidden);
        }
    }
    // remove the loading wheel
    if (loadingWheel) loadingWheel.classList.toggle("hidden-by-extension", hidden)
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

async function applySettings() {
    const settings = await browser.storage.local.get();

    setVoidMode(settings.voidMode ?? false);
    setStoriesHidden(settings.homeStories ?? false);
    setReelsTabHidden(settings.sideReels ?? false);
    setExploreTabHidden(settings.sideExplore ?? false);
    blockReelsPage(settings.redirectReels ?? false);
    blockExplorePage(settings.redirectExplore ?? false);
    hideHomeFeed(settings.homeFeed ?? false);

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
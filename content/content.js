const CONFIG = {
    instagramUrl: "https://www.instagram.com/",
    selectors:{
        homePageStories: '[data-pagelet="story_tray"]',
        reelsTab: 'a[href="/reels/"]',
        exploreTab: 'a[href="/explore/"]',
        loadingState: '[data-visualcompletion="loading-state"]'
    }
}


function hideHomeFeed(){
    const posts = document.querySelectorAll("article");
    console.log("THERE ARE A TOTAL OF:", posts.length)
    for (const post of posts){
        post.classList.add("hidden-by-extension");
    }

    // remove the loading wheel
    const loading = document.querySelector(CONFIG.selectors.loadingState);
    if (loading) {
        loading.classList.add("hidden-by-extension");
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

async function applySettings() {
    const settings = await browser.storage.local.get();

    setStoriesHidden(settings.homeStories ?? false);
    setReelsTabHidden(settings.sideReels ?? false);
    setExploreTabHidden(settings.sideExplore ?? false);
    blockReelsPage(settings.redirectReels ?? false);
    blockExplorePage(settings.redirectExplore ?? false);

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
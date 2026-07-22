const CONFIG = {
    selectors:{
        homePageStories: '[data-pagelet="story_tray"]',
        reelsTab: 'a[href="/reels/"]',
        exploreTab: 'a[href="/explore/"]'
    }
}

function hideStories() {
    const stories = document.querySelector(CONFIG.selectors.homePageStories);
    stories?.classList.add("hidden-by-extension");
}

function hideReelsTab(){
    const reels = document.querySelector(CONFIG.selectors.reelsTab);
    reels?.classList.add("hidden-by-extension");
}

function hideExploreTab(){
    const explore = document.querySelector(CONFIG.selectors.exploreTab);
    explore?.classList.add("hidden-by-extension");
}


const observer = new MutationObserver(() => {
    hideStories();
    hideReelsTab();
    hideExploreTab();
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});
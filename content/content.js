const CONFIG = {
    instagramUrl: "https://www.instagram.com/",
    selectors:{
        homePageStories: '[data-pagelet="story_tray"]',
        reelsTab: 'a[href="/reels/"]',
        exploreTab: 'a[href="/explore/"]',
        loadingState: '[data-visualcompletion="loading-state"]'
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

function blockReelsPage() {
  if (window.location.href.includes('instagram.com/reels')) {
    window.location.href = CONFIG.instagramUrl;
  }
}

function blockExplorePage() {
  if (window.location.href.includes('instagram.com/explore')) {
    window.location.href = CONFIG.instagramUrl;
  }
}

browser.storage.local.onChanged.addListener((changes) =>{
    console.log("Detected changes", changes);
})

const observer = new MutationObserver(() => {
    hideStories();
    hideReelsTab();
    hideExploreTab();
    blockExplorePage();
    blockReelsPage();
    //hideHomeFeed();
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});
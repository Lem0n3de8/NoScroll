const CONFIG = {
    default:{
      instagram:'https://www.instagram.com/'
    },
    selectors:{
        stories: '[data-pagelet="story_tray"]',
        reelsTab: 'a[href="/reels/"]',
        explorePage: 'a[href="/explore/"]',
        loadingState: '[data-visualcompletion="loading-state"]'
    }
}

function removeStories() {
  const storiesElement = document.querySelector(CONFIG.selectors.stories);
  if (storiesElement) {
    storiesElement.remove();
  }
}

function removeReels() {
  const reelsLink = document.querySelector(CONFIG.selectors.reelsTab);
  if (reelsLink && reelsLink.parentElement) {
    reelsLink.parentElement.remove();
  }
}

function removeExplore() {
  const exploreLink = document.querySelector(CONFIG.selectors.explorePage);
  if (exploreLink && exploreLink.parentElement){
    exploreLink.parentElement.remove();
  }
}

function removeHomeFeed(){
  //TODO: Change targeted tag name

  // remove the loading wheel
  const loading = document.querySelector(CONFIG.selectors.loadingState);
  if (loading && loading.parentElement) {
    loading.parentElement.remove();
  }
  //remove the homepage posts/reels
  const posts = document.getElementsByTagName("article")
  for (const post of posts){
    post.remove();
  }
}

function blockReelsPage() {
  if (window.location.href.includes('instagram.com/reels')) {
    window.location.href = CONFIG.default.instagram;
  }
}

function blockExplorePage() {
  if (window.location.href.includes('instagram.com/explore')) {
    window.location.href = CONFIG.default.instagram;
  }
}

function handlePageUpdate() {
    removeStories();
    removeReels();
    removeExplore();
    // Temporarily disabled because it also affects posts/reels send in DM. 
    // removeHomeFeed();
    blockReelsPage();
    blockExplorePage();

}


function init() {
  // initial cleanup
  handlePageUpdate();
  

  const observer = new MutationObserver(handlePageUpdate);
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  console.log("NoScroll active");
}

init();
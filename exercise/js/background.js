chrome.contextMenus.create({
    "id": "linkSiteMenu",
    "title": "Link site for later",
    "contexts": ["all"]
});
const addQuickActionItem = (id, text, tab) => {
    let website = null;
    if(id == "quick-action-2") {
      website = {
        url: tab.url,
        fav_icon: tab.favIconUrl,
        title: tab.title
      }
    }
    

    add(text, website)
  }

const add = (text, website=null) => {
    let actionItem = {
      id: uuidv4(),
      added: new Date().toString(),
      text: text,
      completed: null,
      website: website
    };
  
    // chrome.storage.sync.set({
    //   actionItems: [actionItem]
    // })
  
    chrome.storage.sync.get(['actionItems'], (data) => {
      // console.log(data);
      let items = data.actionItems;
      if (!items) {
        items = [actionItem]
      } else {
        items.push(actionItem);
      }
      chrome.storage.sync.set({
        actionItems: items
      });
    });
  
    // chrome.storage.sync.get(['actionItems', (data) => {
      
  // }]);
}  


const setProgress = () => {
    chrome.storage.sync.get(['actionItems'], (data)=>{
      let actionItems = data.actionItems;
      let completedItems;
      let totalItems = actionItems.length;
      completedItems = actionItems.filter(item => item.completed);
      let progress = 0;
      progress = completedItems.length/totalItems;
      setBrowserBadge(1 + totalItems - completedItems.length);
      if(typeof window.circle !== "undefined") {
        if(totalItems > 0) {
            circle.animate(progress);
          } else {
            circle.animate(0);
          }
      }
      
    })
}
  
const setBrowserBadge = (todoItems) => {
    let text = `${todoItems}`;  
    if(todoItems > 9) {
      text = '9+';  
    }
    chrome.browserAction.setBadgeText({text: text});
}

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason == 'install') {
    console.log("On Install");
    chrome.storage.sync.set({
      actionItems: []
    })
  }
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId == "linkSiteMenu") {
        addQuickActionItem("quick-action-2", "Read this site", tab);
        setProgress();
        console.log("WE BE DONE");
    }
})
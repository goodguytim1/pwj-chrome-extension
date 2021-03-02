
class ActionItems {
    addQuickActionItem = (id, text, tab) => {
      let website = null;
      if(id == "quick-action-2") {
        website = {
          url: tab.url,
          fav_icon: tab.favIconUrl,
          title: tab.title
        }
      }
      

      this.add(text, website)
    }

    add = (text, website=null) => {
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
      
          renderActionItem(text, actionItem.id, actionItem.completed, actionItem.website, 250);
          this.setProgress();
        });
      
        // chrome.storage.sync.get(['actionItems', (data) => {
          
      // }]);
    }

    saveName = (name, callback) => {
      storage.set({
        name: name
      }, callback)
    }

    
    remove = (id) => {
      storage.get(['actionItems'], (data) => {
        let items = data.actionItems;
        let foundItemIndex = items.findIndex((item) => item.id == id);
        if (foundItemIndex>= 0) {
          items.splice(foundItemIndex, 1);
          chrome.storage.sync.set({
            actionItems: items
          }, () => {
              this.setProgress();
          })
        }
        console.log(items);
      })

    }

    markUnmarkCompleted = (id, completeStatus) => {
        storage.get(['actionItems'], (data) => {
          let items = data.actionItems;
          let foundItemIndex = items.findIndex((item) => item.id == id);
          if (foundItemIndex>= 0) {
            items[foundItemIndex].completed = completeStatus;
            chrome.storage.sync.set({
              actionItems: items
            }, () => {
                this.setProgress();
            })
          }
          console.log(items);
        })
      }

    setProgress = () => {
      storage.get(['actionItems'], (data)=>{
        let actionItems = data.actionItems;
        let completedItems;
        let totalItems = actionItems.length;
        completedItems = actionItems.filter(item => item.completed);
        let progress = 0;
        progress = completedItems.length/totalItems;
        this.setBrowserBadge(totalItems - completedItems.length);
        if(totalItems > 0) {
          circle.animate(progress);
        } else {
          circle.animate(0);
        }
      })
    }
    
    setBrowserBadge = (todoItems) => {
      let text = `${todoItems}`;  
      if(todoItems > 9) {
        text = '9+';  
      }
      chrome.browserAction.setBadgeText({text: text});
    }
      
}
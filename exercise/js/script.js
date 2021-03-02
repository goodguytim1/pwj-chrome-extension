let addItemForm = document.querySelector('#addItemForm');
let itemsList = document.querySelector('.actionItems');
let storage = chrome.storage.sync;

let actionItemsUtils = new ActionItems();

//chrome.storage.sync.clear();

storage.get(['actionItems', 'name'], (data) => {
  let actionItems = data.actionItems;
  let name = data.name;
  setUsersName(name);
  setGreeting();
  setGreetingImage();
  //console.log(actionItems);
  createQuickActionListener();
  renderActionItems(actionItems);
  createUpdateNameDialogListener();
  createUpdateNameListener();
  actionItemsUtils.setProgress();
  
  // getCurrentTab();
  // chrome.storage.onChanged.addEventListener(() => {
  //   actionItemsUtils.setProgress();
  // })
});

const renderActionItems = (actionItems) => {
  // Filter out completed items from yesterday
  const filteredItems = filterActionItems(actionItems);
  if(actionItems) {
    filteredItems.forEach((item) => {
      renderActionItem(item.text, item.id, item.completed, item.website, 450);
    })
    storage.set({
      actionItems: filteredItems
    })
  }
}

const filterActionItems = (actionItems) => {
  var currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const filteredItems = actionItems.filter((item) => {
    if(item.completed){
      const completedDate = new Date(item.completed);
      if(completedDate < currentDate) {
        return false;
      }
    } 
    return true;
  })
  return filteredItems;
}

const createUpdateNameDialogListener = () => {
  let greetingName = document.querySelector('.greeting__name');
  greetingName.addEventListener('click', () => {
    // OPEN MODAL
    storage.get(['name'], (data) => {
      let name = data.name ? data.name : '';
      document.getElementById('inputName').value = name;
    })
    
    $('#modalUpdateName').modal('show')
  })
}

const handleQuickActionListener = (e) => {
  const text = e.target.getAttribute('data-text');
  const id = e.target.getAttribute('data-id');
  getCurrentTab().then((tab)=>{
    actionItemsUtils.addQuickActionItem(id, text, tab);
  })
  // actionItemsUtils.add(text);
  // console.log(text);
}

const createQuickActionListener = () => {
  let buttons = document.querySelectorAll('.quick-action');
  buttons.forEach((button) => {
    button.addEventListener('click', handleQuickActionListener)
  })
} 

async function getCurrentTab () {
  return await new Promise((resolve, reject)=>{
    chrome.tabs.query({'active': true, "windowId": chrome.windows.WINDOW_ID_CURRENT }, (tabs) => {
      resolve(tabs[0]);
    })
  });
}

addItemForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let itemText = addItemForm.elements.namedItem('itemText').value;
  if (itemText) {
    actionItemsUtils.add(itemText, null);
    addItemForm.elements.namedItem('itemText').value = '';
  }
});


const handleCompletedEventListener = (e) => {
  const id = e.target.parentElement.parentElement.getAttribute('data-id');
  const parent = e.target.parentElement.parentElement;

  if(parent.classList.contains('completed')) {
    actionItemsUtils.markUnmarkCompleted(id, null);
    parent.classList.remove('completed');
  } else {
    actionItemsUtils.markUnmarkCompleted(id, new Date().toString());
    parent.classList.add('completed');
  }
}

const handleDeleteEventListener = (e) => {
  const id = e.target.parentElement.parentElement.getAttribute('data-id');
  const parent = e.target.parentElement.parentElement;
  let jElement = $(`div[data-id="${id}"]`);
  //remove from chrome storage
  actionItemsUtils.remove(id);
  console.log(jElement);
  animateUp(jElement);
  //parent.remove();
}

const renderActionItem = (text, id, completed, website=null, animationDuration=500) => {
  let element = document.createElement('div');
  element.classList.add('actionItem__item');
  let mainElement = document.createElement('div');
  mainElement.classList.add('actionItem__main');
  let checkEl = document.createElement('div');
  checkEl.classList.add('actionItem__check');
  let textEl = document.createElement('div');
  textEl.classList.add('actionItem__text');
  let deleteEl = document.createElement('div');
  deleteEl.classList.add('actionItem__delete');

  checkEl.innerHTML = `
  <div class="actionItem__checkBox">
  <i class="fas fa-check" aria-hidden="true"></i>
</div>
  `
  if(completed) {
    element.classList.add('completed');
  }
  element.setAttribute('data-id', id);
  deleteEl.addEventListener('click', handleDeleteEventListener);
  checkEl.addEventListener('click', handleCompletedEventListener);
  textEl.textContent = text;
  deleteEl.innerHTML = `                            <div class="actionItem__xBox">
  <i class="fas fa-times"></i>
</div>`

mainElement.appendChild(checkEl);
mainElement.appendChild(textEl);
mainElement.appendChild(deleteEl);
element.appendChild(mainElement);
if(website) {
  let linkContainer = createLinkContainer(website.url, website.fav_icon, website.title);
  element.appendChild(linkContainer);
}

itemsList.prepend(element);
let jElement = $(`div[data-id="${id}"]`);
animateDown(jElement, animationDuration);
}

const animateDown = (element, duration) => {
  let height = element.innerHeight();
  element.css({marginTop: `-${height}px`, opacity:0}).animate({
    marginTop: '12px',
    opacity: 1
  }, duration);
}

const animateUp = (element, duration) => {
  let height = element.innerHeight();
  element.animate({
    opacity: '0',
    marginTop: `-${height}px`
  }, 250, () => {
    element.remove();
  })
}

const createLinkContainer = (url, favIcon, title) => {
  let element = document.createElement('div');
  element.classList.add('actionItem__linkContainer');
  element.innerHTML = `
<a href="${url}" target="_blank">
  <div class="actionItem__link">
    <div class="actionItem__favIcon">
      <img src="${favIcon}" alt="">
    </div>
    <div class="actionItem__title">
      <span>${title}</span> 
    </div>
  </div>
</a>
  `

  return element;
}

const setUsersName = (name) => {
  let newName = name ? name: 'Add name';
  document.querySelector('.name__value').innerText = newName;
}

const handleUpdateName = (e) => {
  // Get input text
  const name = document.querySelector('#inputName').value;
  if (name) {
    // Save name
    actionItemsUtils.saveName(name, () => {
      // set the user's name on front end
      setUsersName(name);
      $('#modalUpdateName').modal('hide');
    })
  }
}

const createUpdateNameListener = () => {
  let element = document.querySelector('#save-btn');
  element.addEventListener('click', handleUpdateName);
}

const setGreeting = () => {
  let greeting = "Good ";
  const date = new Date();
  const hour = date.getHours();
  if (hour >= 5 && hour <= 11) {
    greeting += "Morning,";
  } else if (hour >= 12 && hour <= 16) {
    greeting += "Afternoon,";
  } else if (hour >= 17 && hour <= 20) {
    greeting += "Evening,";
  } else {
    greeting += "Night,";
  }

  document.querySelector('.greeting__type').innerText = greeting;
}


const setGreetingImage = () => {
  let image = document.getElementById('greeting__image');
  const date = new Date();
  const hour = date.getHours();
  if (hour >= 5 && hour <= 11) {
    image.src = './images/good-morning.png';
  } else if (hour >= 12 && hour <= 16) {
    image.src = './images/good-evening.png';
  } else if (hour >= 17 && hour <= 20) {
    image.src = './images/good-afternoon.png';
  } else {
    image.src = './images/good-night.png';
  }
}
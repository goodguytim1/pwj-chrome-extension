# DONE

## DONE: Set up the Chrome Extension App

## DONE: Set up the basic strucrure of the app

#### DONE: Create a structure for action item within action-items class

#### HINTS:

- Create a div with a class `actionItem__item` 
- Duplicate it a few times

## DONE: Create HTML and Style for the header

#### HTML/CSS Structure:

```
.greeting
    h2 .greeting__type
    h2 .greeting__name
    img #greeting__image
```

#### HINTS:
- Use the `good-morning.png` image

## DONE: Add circular progress 

## DONE: Create HTML and Style for Input 

#### HTML/CSS Structure:

```
.actionInput
    h5 .actionInput__text
    .actionInput__inputContainer
        form #addItemForm
            .input-group .input-group-lg
                input .form-control

```

#### HINTS:
- You have to target classes like `input::placeholder` and `input:focus` to rewrite default bootstrap styling
- You can use **Google** to figure out HOW

## DONE: Create HTML and Style for Quick Action Buttons

#### HINTS:
- You have to overwrite bootstrap classes like `.btn-outline-dark` & `.btn-outline-dark:focus` & `.btn-outline-dark:hover` 
- Use a class `actionInput__suggestions` for the parent container of the buttons inside `.actionInput__inputContainer`
- Use buttons from [here](https://getbootstrap.com/docs/4.0/components/buttons/)

## DONE: Create HTML and Style for Action Items

#### HTML Structure:

```
<div class="actionItem__item" >
   <div class="actionItem__main">
      <div class="actionItem__check">
         <div class="actionItem__checkBox">
            <i class="fas fa-check" aria-hidden="true"></i>
         </div>
      </div>
      <div class="actionItem__text">Start on Module 2</div>
      <div class="actionItem__delete"><i class="fas fa-times" aria-hidden="true"></i></div>
   </div>
</div>
```

#### HINTS:
- You need to import `fontawesome.js` that is saved in `packages` folder

## DONE(TOGETHER): Connect the Input to add Action Item to the front end 
- Handle form submission
- Create `renderActionItem()` function
- Add action item html to the action items list with class `.actionItems`

## DONE: Save the Action Item data in a database

#### HINTS:
- Save the data in Chrome Sync
- Create `add()` function
- Add storge permission to `manifest.json`
- Make sure to reload your chrome extension for `manifest.json` to take effect
- You need to grab the list of action items first and then append the new item

## DONE: Display the list of Action Items from the database

#### HINTS:

- Get all `actionItems` from Chrome Storage
- Create `renderActionItems()` function
- Loop through each action item and render it

## DONE(TOGETHER): Clean up the styling

- Clean up spacing and borders

## DONE: Create HTML and Style of the completed action item

#### HINTS:
- Set the background color of `.actionItem__item` to `#b0f1ab`
- Set the checkbox color to `#56e452`
- Add `.completed` class to action item 

## DONE(TOGETHER): Add the ability to mark item completed

- Create an event listener on the checkmark element
- Add a class `.completed` to the clicked element
- Create a `markUnmarkCompleted()` function to set the item completed in chrome storage
- Create a unique id for each element with `uuidv4`
- Add the ability to unmark it completed as well

## DONE: Add the ability to uncheck a completed item

#### HINTS:

- Check if the classlist contains `.completed` class
- If yes then we need to remove the `.completed` class and set it null in Chrome Storage
- If no then we need to add `.completed` class and set it in Chrome Storage
- Set the current date as completed value

## DONE: Udpate items progress in progressbar

#### HINTS:
- Create a `setProgress()` function
- Calculate the percentage of completed items over total items `completedItems/totalItems`
- Use `circle.animate` to update the progress bar

## DONE(TOGETHER): Clean up functions and create an ActionItem Class
- Move the `add()` function
- Move the `markUnmarkCompleted()` function
- Move the `setProgress()` function
- Move the `circle` function to it's own file

## DONE: Add the ability to delete action items

#### HINTS:
- Add an event listener to `.actionItem__delete`
- Create a `handleDeleteEventListener()` function
- Create a `remove()` function to remove the item from Chrome Storage
- On hover of the `X` button, chane the color to `#D00000`

## DONE: Add the ability to add Quick Action items

#### HINTS:
- Create an event listener for quick action buttons with a `createQuickActionListener()` function
- Create an event handler `handleQuickActionListener()` function 
- Add `data-text` attribute to every button as text that will be used for the action item
- Use the `add()`

## DONE: Capture the link of the site from the curent tab in Chrome

#### HINTS:
- Create a `getCurrentTab()` function to get active tab
- Use `chrome.tabs.query` to grab tab data
- Create a `addQuickActionItem()` function in `action-items-utils.js` to add website data to action item
- Structure website data like so
```
website = {
    url: tab.url,
    fav_icon: tab.favIconUrl,
    title: tab.title
}
```
- Make sure to add website data only if `Link site for later` is clicked

## DONE(TOGETHER): Create HTML and Style for "Link site for later"

- Create a `createLinkContainer()` function

#### HTML Structure
```
.actionItem__linkContainer
    a
        .actionItem__link
            .actionItem__favIcon
                img
            .actionItem__title
                span
```

## DONE: Show the Link on click of "Link site for later"

#### HINTS:
- Create a `createLinkContainer()` function
- Use `document.createElement` to create the link from our HTML
- Append the link element to action item in `renderActionItem()` function
- Make sure to check if webiste data exists

## DONE: Create the Update Name modal

#### HINTS:
- Use the Bootstrap modal from [here](https://getbootstrap.com/docs/4.0/components/modal/)
- Create click listener on the `.greeting__name`
- Open dialog on click of the name text
- Use the `modal-dialog-centered`

## DONE: Finish styling for greeting name

#### HINTS:
- Add a pencil icon next to greeting name `fas fa-pen` within `.greeting__name`
- Add a `.name__value` class within `.greeting__name` class that will contain the name value
- Show the pencil icon only on hover of `.greeting__name`
- Font size for pencil icon is `font-size: 0.8em;`

## DONE: Save the name from modal input

#### HINTS:
- Create a `createUpdateNameListener()` for when `Save Changes` is clicked
- Create a `handleUpdateName()` for retrieving the new name from input
- Create a `saveName()` function to save name in Chrome Storage
- Create a `setUsersName()` function to change the name text in `.name__value`
- Remember to set the user's name when when opening Chrome Extension

## DONE: Set the greeting depending on time of day

#### HINTS:
- Create a `setGreeting()` function
- Set the text in HTML using JavaScript
- Time: 5 - 11 -> Good Morning
- Time: 12 - 16 -> Good Afternoon
- Time: 17 - 20 -> Good Evening
- Time: 20 - 5 -> Good Night

## DONE: Set the greeting image based on time of day

#### HINTS:
- Create a `setGreetingImage()` function
- Set image based on type of the day

## DONE: Add a browser badge to show number of action items

#### HINTS:
- Create a `setBrowserBadge()` function
- Figure out how to set the badge in chrome
- Call the `setBrowserBadge()` when setting the progress

## DONE: Create a right click context menu for adding an action item

#### HINTS:
- Create a `background.js` file
- Add a context menu with the id `linkSiteMenu`
- Capture the Context Menu click using `contextMenus.onClicked.addListener`
- Add the quick action item
- Make sure to update the badge after adding the item

## DONE: Filter old completed action items 

#### HINTS:
- Create a `filterActionItems()` function
- Use the `.filter()` funcion
- Filter out completed items before today `completedDate < currentDate`
- Current date is today midnight
- Make sure to filter action items before rendering them

## DONE(TOGETHER): Clean up

- Set progrss to `0` if there are 0 completed items
- Add transition for `checkmark`
- Fix link styling on completion of action item
- Provide padding for the update name modal
- Make sure progress bar works with 0 completed items

## DONE: Initialize action items on installation of the extension

#### HINTS
- Add functionality inside `background.js`
- Use `chrome.runtime.onInstalled` function
- Set action items in Chrome Storage to `[]`

## DONE(TOGETHER): Add an EPIC animation for when adding a new action item
- Create an `animateDown()` function 
- Animate from `opacity: 0` to `opacity: 1`
- Animate the full height of element
- Call the funcation after rendering it

## DONE: Add an EPIC animation for when deleting an action item

#### HINTS:
- Create an `animateUp()` function where we will animate the action item when deleting it
- Use the jQuery animate function
- Animate from `opacity: 1` to `opacity: 0`
- Animate to `marginTop: -${height}px`
- Upon completion of the animation remove the element fully

## DONE(TOGETHER): Add an EPIC animation for marking an action item completed

## DONE: Upload the extension to Chrome Web Store





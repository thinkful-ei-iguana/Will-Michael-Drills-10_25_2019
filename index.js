/* eslint-disable no-undef */
'use strict';

const STORE = [
  {id: cuid(), name: 'apples', checked: false},
  {id: cuid(), name: 'oranges', checked: false},
  {id: cuid(), name: 'milk', checked: true},
  {id: cuid(), name: 'bread', checked: false}
];


function generateItemElement(item) {
  return `
    <li data-item-id="${item.id}">
      <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}


function generateShoppingItemsString(shoppingList) {
  console.log('Generating shopping list element');

  const items = shoppingList.map((item) => generateItemElement(item));
  
  return items.join('');
}


function renderShoppingList() {
  // render the shopping list in the DOM
  console.log('`renderShoppingList` ran');
  const shoppingListItemsString = generateShoppingItemsString(STORE);

  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
}

function addItemToShoppingList(itemName){
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.push({id: cuid(), name: itemName, checked: false});
}

function handleNewItemSubmit() {
  // this function will be responsible for 
  // when users add a new shopping list item

  //Take user input, add it to the STORE array. Then needs to call
  //generateItemElement genereteShopping.. string then needs to call
  //renderShoppingList
  $('#js-shopping-list-form').submit(function(event){
    event.preventDefault();
    console.log('`handleNewItemSubmit` ran');
    const newItemName = $('.js-shopping-list-entry').val();
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

function getItemIdFromElement(item){
  return $(item).closest('li').data('item-id');
}

function toggleCheckedForListItem(itemId){
  console.log(`Toggling checked property for item id ${itemId}`);
  const item = STORE.find(item => item.id === itemId);
  item.checked = !item.checked;
}

function handleItemCheckClicked() {
  // this function will be responsible for when users click the "check" button on
  // a shopping list item.

  //listen for id "check" button press
  //apply .shopping-item__checked to the "shopping-item"
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    const id = getItemIdFromElement(event.currentTarget);
    toggleCheckedForListItem(id);
    console.log('handleItemCheckClicked` ran');
    renderShoppingList();
  });

}

function deleteListItem(itemId){
  console.log(`Deleting list Id for item id ${itemId}`);
  const item = STORE.findIndex(item => item.id === itemId);
  // item.checked = !item.checked;
  STORE.splice(item, 1);
  console.log(STORE);
}

function handleDeleteItemClicked() {
  // this function will be responsible for when users want to delete a shopping list
  // item

  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    const item = getItemIdFromElement(event.currentTarget);
    deleteListItem(item);
    renderShoppingList();
  });
}

// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();

}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);
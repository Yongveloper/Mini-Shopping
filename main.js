'use strcit';

function loadItems() {
  return fetch('data/data.json')
    .then((response) => response.json())
    .then((json) => json.items);
}

function displayItems(items) {
  const container = document.querySelector('.items');
  container.innerHTML = items.map((item) => createHTMLString(item)).join('');
}

function createHTMLString(item) {
  return `
    <li class="item" data-type="${item.type}" data-color="${item.color}">
            <img src="${item.image}" alt="${item.type}" class="item__thumbnail" />
            <span class="item__description">${item.gender}, ${item.size}</span>
        </li>
    `;
}

function onButtonClick(e) {
  const dataSet = e.target.dataset;
  const key = dataSet.key;
  const value = dataSet.value;

  if (key == null || value == null) {
    return;
  }

  updateItems(key, value);
}

function updateItems(key, value) {
  const items = document.querySelectorAll('.item');

  items.forEach((item) => {
    if (item.dataset[key] === value) {
      item.classList.remove('invisible');
    } else {
      item.classList.add('invisible');
    }
  });
}

function setEventHandler(items) {
  const buttons = document.querySelector('.buttons');
  const logo = document.querySelector('.logo');

  buttons.addEventListener('click', (e) => onButtonClick(e, items));
  logo.addEventListener('click', () => displayItems(items));
}

loadItems()
  .then((items) => {
    displayItems(items);
    setEventHandler(items);
  })
  .catch((error) => console.log(error));

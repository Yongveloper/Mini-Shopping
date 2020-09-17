'use strict';
// JSON 파일에서 항목 가져오기
function loadItems() {
    return fetch('data/data.json')
    .then(response => response.json())
    .then(json => json.items);    
}

// 지정된 항목으로 목록 업데이트
function displayItems(items) {
    const container = document.querySelector('.items');    
    container.innerHTML = items.map(item => createHTMLString(item)).join('');
}

// 지정된 데이터 항목에서 HTML 목록 항목 생성
function createHTMLString(item) {
    return `
    <li class="item">
            <img src="${item.image}" alt="${item.type}" class="item__thumbnail" />
            <span class="item__description">${item.gender}, ${item.size}</span>
        </li>         
    `;
}

function onButtonClick(event, items) {
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;
    
    if(key === null || value === null) {
        return;
    }

    const filtered = items.filter(item => item[key] === value);
    displayItems(filtered);
}

function setEventListers(items) {
    const logo = document.querySelector('.logo');
    const buttons = document.querySelector('.buttons');    
    logo.addEventListener('click', () => displayItems(items));
    buttons.addEventListener('click', evnet => onButtonClick(evnet, items));
}

// main
loadItems()
.then(items => {    
    displayItems(items);
    setEventListers(items);
})
.catch(console.log);
const items = document.querySelector('.items');
const form = document.querySelector('.new-form');
const input = document.querySelector('.footer__input');
const addBtn = document.querySelector('.footer__button');

// form에서 사용자가 inpu에서 엔터를 누르거나 버튼을 입력하게 되면 submit 이라는 이벤트 발생!
// submit 이라는 이벤트가 발생하면 브라우저가 페이지 자동으로 다시 로딩하게 됨.
// 자동적인 행동을 원하지 않을 경우! -> event.preventDefault(); 설정
form.addEventListener('submit', event => {
  event.preventDefault();
  onAdd();
});  
function onAdd() {
  const text = input.value;
  console.log(text);
  if(text === '') {
    input.focus();
    return;
  }

  const item = createItem(text);
  items.appendChild(item);
  items.scrollIntoView({ block: 'center' });
  input.value = '';
  input.focus();
}

let id = 0;  // UUID 
function createItem(text) {
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class', 'item__row');
  itemRow.setAttribute('data-id', id);
  itemRow.innerHTML = `
        <div class="item">
          <span class="item__name">${text}</span>
          <button class="item__delete">
            <i class="fa-solid fa-trash-can" data-id=${id}></i>
          </button>
        </div>
        <div class="item__divider"></div>`;
  id++;      
  return itemRow;
}

items.addEventListener('click', event => {
  // 디버깅 통해서 확인하기.
  const id = event.target.dataset.id;
  if (id) {  
    const toBeDeleted = document.querySelector(`.item__row[data-id="${id}"]`);
    toBeDeleted.remove();
  }
});
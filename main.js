const items = document.querySelector('.items');
const input = document.querySelector('.footer__input');
const addBtn = document.querySelector('.footer__button');


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
addBtn.addEventListener('click', () => {
  onAdd();
});

input.addEventListener('keydown', event => {
  // 글자가 만들어지고 있는 중간에 발생하는 이벤트 무시
  if (event.isComposing) {
    return;
  }
  // console.log('key');
  if(event.key === 'Enter') {
    onAdd();
  }
});

items.addEventListener('click', event => {
  // 디버깅 통해서 확인하기.
  const id = event.target.dataset.id;
  if (id) {  
    const toBeDeleted = document.querySelector(`.item__row[data-id="${id}"]`);
    toBeDeleted.remove();
  }
});
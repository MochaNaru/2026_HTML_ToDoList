/* ---------------------------------------------------------
  1. 요소 선택
--------------------------------------------------------- */
const form = document.querySelector('.todo-form');
const input = document.querySelector('.todo-input');
const list = document.querySelector('.todo-list');
const emptyMsg = document.querySelector('.empty-msg');
const countText = document.querySelector('.todo-count');
const clearBtn = document.querySelector('.clear-btn');

/* ---------------------------------------------------------
  2. 데이터: 할 일 목록 배열
--------------------------------------------------------- */
let todos = [
  { text: 'HTML 복습하기', done: true },
  { text: '자바스크립트 배열 공부하기', done: false },
  { text: 'To-do List 직접 만들어 보기', done: false }
];

/* ---------------------------------------------------------
  3. 화면 그리기 함수 render()
--------------------------------------------------------- */
function render() {
  // (1) 기존 목록을 모두 비운다.
  list.innerHTML = '';

  // (2) 배열의 항목을 하나씩 꺼내 li 요소를 만든다.
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    if (todo.done) {
      li.classList.add('done'); 
    }

    // 체크박스 만들기
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.done;
    checkbox.addEventListener('change', () => {
      todo.done = checkbox.checked;
      render(); 
    });

    // 글자 만들기
    const span = document.createElement('span');
    span.classList.add('todo-text');
    span.textContent = todo.text;

    // 삭제 버튼 만들기
    const delBtn = document.createElement('button');
    delBtn.classList.add('delete-btn');
    delBtn.type = 'button';
    delBtn.textContent = '삭제';
    delBtn.addEventListener('click', () => {
      todos.splice(index, 1); 
      render();
    });

    // li안에 자식 요소를 차례대로 넣는다.
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);
    
    // 완성된 li를 ul에 붙인다.
    list.appendChild(li);
  });

  // (3) '남은 할 일' 개수와 안내 문구 갱신 [오류 수정]
  const remaining = todos.filter((todo) => !todo.done).length;
  countText.textContent = `남은 할 일 ${remaining}개`;

  // [오류 수정: emptyMag -> emptyMsg]
  if (todos.length === 0) {
    emptyMsg.classList.add('show');
  } else {
    emptyMsg.classList.remove('show');
  }
}

/* ---------------------------------------------------------
  4. 할 일 추가 — form 의 submit 이벤트
--------------------------------------------------------- */
form.addEventListener('submit', (event) => {
  event.preventDefault(); 

  const text = input.value.trim();

  // [오류 수정: 입력값이 비어있을 때 함수를 종료하도록 변경]
  if (text === '') {
    input.focus();
    return;
  }

  // 배열에 새 항목을 추가하고, 화면을 다시 그린다.
  todos.push({ text: text, done: false });
  input.value = '';
  input.focus();
  render();
}); // 이벤트 리스너 닫기 추가

/* ---------------------------------------------------------
  5. 완료 항목 삭제
--------------------------------------------------------- */
clearBtn.addEventListener('click', () => {
  todos = todos.filter((todo) => todo.done === false);
  render();
}); // [오류 수정: 괄호 누락 보완]

/* ---------------------------------------------------------
  6. 페이지를 열자마자 처음 한 번 그린다.
--------------------------------------------------------- */
render();

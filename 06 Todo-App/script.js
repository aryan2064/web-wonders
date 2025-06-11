var taskInput = document.getElementById('taskInput');
var addBtn = document.getElementById('addBtn');
var taskList = document.getElementById('taskList');

addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    addTask();
  }
});

function addTask() {
  var text = taskInput.value.trim();
  if (text === '') {
    return;
  }

  var li = document.createElement('li');
  li.className = 'task-item';

  var span = document.createElement('span');
  span.className = 'task-text';
  span.textContent = text;
  span.addEventListener('click', toggleComplete);

  var actions = document.createElement('div');
  actions.className = 'task-actions';

  var completeBtn = document.createElement('button');
  completeBtn.className = 'btn-complete';
  completeBtn.textContent = 'Done';
  completeBtn.addEventListener('click', toggleComplete);

  var deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn-delete';
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', deleteTask);

  actions.appendChild(completeBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(actions);

  taskList.appendChild(li);

  taskInput.value = '';
  taskInput.focus();
}

function toggleComplete() {
  var li = this.closest('.task-item');
  li.classList.toggle('completed');
  if (li.classList.contains('completed')) {
    taskList.appendChild(li);
  } else {
    var firstCompleted = taskList.querySelector('.completed');
    if (firstCompleted) {
      taskList.insertBefore(li, firstCompleted);
    } else {
      taskList.appendChild(li);
    }
  }
}

function deleteTask() {
  var li = this.closest('.task-item');
  li.remove();
}
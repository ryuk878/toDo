import { v4 as uuidV4 } from 'uuid';
import { taskList, add, remove, Task } from './tasklist';

const list = document.querySelector<HTMLUListElement>('#list');
const form = document.querySelector<HTMLFormElement>('#new-task-form');
const input = document.querySelector<HTMLInputElement>('#new-task-title');

const tasks = taskList;
tasks.forEach(listHandler);

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input?.value == '' || input?.value == null) return;

  const title = input.value;

  const addItem = add(title);

  listHandler(addItem);

  input.value = '';
});

function listHandler(task: Task) {
  const item = document.createElement('li');
  const label = document.createElement('label');
  const checkbox = document.createElement('input');

  checkbox.addEventListener('change', (event) => {
    task.completed = checkbox.checked;

    if (task.completed === true) {
      const itemId = (event.target as HTMLInputElement)?.dataset.itemId;

      if (itemId === undefined) return;
      remove(itemId);
      item.parentElement?.removeChild(item);
    }
  });

  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  label.append(checkbox, task.title as string);
  checkbox.dataset.itemId = task.id;
  item.append(label);
  list?.append(item);
}
// toggle completed

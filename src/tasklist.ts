import { v4 as uuidV4 } from 'uuid';

const input = document.querySelector<HTMLInputElement>('#new-task-title');

export type Task = {
  id: string;
  title?: string;
  completed: boolean;
  createAt: Date;
};

export const taskList = load();

export function add(title : string) {

  const addItem = {
    id: uuidV4(),
    title: title,
    completed: false,
    createAt: new Date(),
  };

  taskList.push(addItem);

  save();

  return addItem;
}

export function remove(id: string): void {
  const index = taskList.findIndex((task) => task.id === id);

  if (index < 0) return;

  taskList.splice(index, 1);

  save();
}

function save() {
  localStorage.setItem('tasks', JSON.stringify(taskList));
}

function load(): Array<Task> {
  return JSON.parse(localStorage.getItem('tasks') ?? '[]');
}

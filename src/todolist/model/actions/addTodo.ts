import store from '@/store/store';

let id = 3;

export default function addTodo(): void {
  const { todosState } = store.getState();
  todosState.todos.push({ id, name: 'new todo', isDone: false });
  id++;
}

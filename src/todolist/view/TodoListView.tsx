import * as React from 'react';
import { useEffect } from 'react';
import store from '@/store/store';
import { Todo } from '@/todolist/model/state/initialTodoListState';
import removeTodo from '@/todolist/model/actions/removeTodo';
import fetchTodos from '@/todolist/model/actions/fetchTodos';
import todoListController from '@/todolist/controller/todoListController';
import toggleIsDoneTodo from '@/todolist/model/actions/toggleIsDoneTodo';
import toggleShouldShowOnlyUnDoneTodos from '@/todolist/model/actions/toggleShouldShowOnlyUnDoneTodos';

const TodoListView = () => {
  const [{ todosState }, { shownTodos, userName }] = store.getStateAndSelectors();
  store.useStateAndSelectors([todosState], [shownTodos, userName]);

  useEffect(() => {
    // noinspection JSIgnoredPromiseFromCall
    fetchTodos();
    document.addEventListener('keydown', todoListController.handleKeyDown);
    return () => document.removeEventListener('keydown', todoListController.handleKeyDown);
  }, []);

  let todoListContent;

  if (todosState.isFetchingTodos) {
    todoListContent = <div>Fetching todos...</div>;
  } else if (todosState.hasTodosFetchFailure) {
    todoListContent = <div>Failed to fetch todos</div>;
  } else {
    const todoListItems = shownTodos.value.map((todo: Todo) => (
      <li key={todo.id}>
        <input
          id={todo.name}
          type="checkbox"
          defaultChecked={todo.isDone}
          onChange={() => toggleIsDoneTodo(todo)}
        />
        <label>
          {userName.value}: {todo.name}
        </label>
        <button onClick={() => removeTodo(todo)}>Remove</button>
      </li>
    ));

    todoListContent = <ul>{todoListItems}</ul>;
  }

  return (
    <div>
      <input
        id="shouldShowOnlyDoneTodos"
        type="checkbox"
        defaultChecked={todosState.shouldShowOnlyUnDoneTodos}
        onChange={toggleShouldShowOnlyUnDoneTodos}
      />
      <label>Show only undone todos</label>
      {todoListContent}
    </div>
  );
};

export default TodoListView;

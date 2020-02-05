import store from '@/store/store';
import getServices from '@/services/services';

export default async function fetchTodos(): Promise<void> {
  const { todosState } = store.getState();

  todosState.isFetchingTodos = true;
  todosState.hasTodosFetchFailure = false;

  try {

    todosState.todos = await (await getServices()).todoService.tryFetchTodos();
  } catch (error) {
    todosState.hasTodosFetchFailure = true;
  }

  todosState.isFetchingTodos = false;
}

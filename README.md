# Universal Model React Todo App with Dependency Injection

If you want to use dependency injection, I suggest to use [noicejs library]

    npm install --save noicejs
    
## Example usage

### 1. Create module(s)
Bind service names to service constructor functions 

ServiceModule.ts

    import { Module, ModuleOptions } from 'noicejs';
    import FakeTodoService from '@/todolist/model/services/FakeTodoService';
    
    export default class ServiceModule extends Module {
      public async configure(options: ModuleOptions) {
        await super.configure(options);
    
        this.bind('todoService').toConstructor(FakeTodoService);
        this.bind('componentAService').toConstructor(FakeComponentAService);
        this.bind('componentBService').toConstructor(RealComponentBService);
        .
        .
      }
    }
    
### 2. Create Dependency Injection (DI) container
Use module(s) created in step 1. to create DI container

diContainer.ts

    import { Container } from 'noicejs';
    import ServiceModule from '@/modules/ServiceModule';
    
    export default Container.from(new ServiceModule())
    

### 3. Configure DI container
Configure DI container created in step 2. in main

main.tsx
    
    import diContainer from '@/diContainer';

    diContainer.configure().then(() => {
      const rootElement = document.getElementById('app');
    
      if (rootElement) {
        render(<App />, rootElement);
      }
    });
    
### 4. Create services
Inject services by names to Services class constructor

services.ts

    import { BaseOptions, Inject } from 'noicejs';
    import diContainer from '@/diContainer';
    import { ITodoService } from '@/todolist/model/services/ITodoService';
    
    interface ServicesOptions extends BaseOptions {
      todoService: ITodoService;
      componentAService: IComponentAService;
      componentBService: IComponentBService;
      .
      .
    }
    
    @Inject('todoService', 'componentAService', 'componentBService', ...)
    class Services {
     todoService: ITodoService;
     componentBService: IComponentBService;
     componentCService: IComponentCService;
     .
     .
    
      constructor(options: ServicesOptions) {
        this.todoService = options.todoService;
        this.componentBService = options.componentBService;
        this.componentCService = options.componentCService;
        .
        .
      }
    }
    
    let services: Services;
    
    export default async function getServices() {
      if (services) {
        return Promise.resolve(services);
      }
    
      services = await diContainer.create(Services);
      return services;
    };

### 5. Use service in action
fetchTodos.ts

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

[noicejs library]: https://github.com/ssube/noicejs



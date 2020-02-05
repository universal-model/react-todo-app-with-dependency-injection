# Universal Model React Todo App with Dependency Injection

If you want to use dependency injection, I suggest to use [noicejs library]

    npm install --save noicejs
    
## Example usage

### 1. Create module(s)
ServiceModule.ts

    import { Module, ModuleOptions } from 'noicejs';
    
    export default class ServiceModule extends Module {
      public async configure(options: ModuleOptions) {
        await super.configure(options);
    
        this.bind('componentAService').toConstructor(FakeComponentAService);
        this.bind('componentBService').toConstructor(FakeComponentBService);
        this.bind('componentCService').toConstructor(RealComponentCService);
        .
        .
      }
    }
    
### 2. Create Dependency Injection (DI) container
diContainer.ts

    import { Container } from 'noicejs';
    import ServiceModule from '@/modules/ServiceModule';
    
    export default Container.from(new ServiceModule())
    

### 3. Configure DI container
main.tsx
    
    import diContainer from '@/diContainer';

    diContainer.configure().then(() => {
      const rootElement = document.getElementById('app');
    
      if (rootElement) {
        render(<App />, rootElement);
      }
    });
    
### 4. Create services
services.ts

    import { BaseOptions, Inject } from 'noicejs';
    import diContainer from '@/diContainer';
    
    interface ServicesOptions extends BaseOptions {
      componentAService: IComponentAService;
      componentBService: IComponentBService;
      componentCService: IComponentCService;
      .
      .
    }
    
    @Inject('componentAService', 'componentBService', 'componentCService', ...)
    class Services {
     componentAService: IComponentAService;
     componentBService: IComponentBService;
     componentCService: IComponentCService;
     .
     .
    
      constructor(options: ServicesOptions) {
        this.componentAService = options.componentAService;
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

### 5. Use service

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



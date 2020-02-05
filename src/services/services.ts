import { BaseOptions, Inject } from 'noicejs';
import { ITodoService } from '@/todolist/model/services/ITodoService';
import diContainer from '@/diContainer';

interface ServicesOptions extends BaseOptions {
  todoService: ITodoService;
}

@Inject('todoService')
class Services {
  todoService: ITodoService;

  constructor(options: ServicesOptions) {
    this.todoService = options.todoService;
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

import { Module, ModuleOptions } from 'noicejs';
import FakeTodoService from '@/todolist/model/services/FakeTodoService';

export default class ServiceModule extends Module {
  public async configure(options: ModuleOptions) {
    await super.configure(options);

    this.bind('todoService').toConstructor(FakeTodoService);
  }
}

import { AutoSavable, AutoSaveField } from './LocalStorage';

@AutoSavable
export class MyService2 {
  @AutoSaveField test = 'something';
}

import { AutoSavable, AutoSaveField } from './LocalStorage';

@AutoSavable
export class MyService {
  @AutoSaveField test = 'something';

  log = () => console.log('MyService.log()');
}

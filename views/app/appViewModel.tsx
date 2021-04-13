import {LocalStorage, MyService} from '@utils';
import {Service} from 'typedi';

@Service()
export default class AppViewModel {
  a = 1;

  log = (): void => {
    // console.log(this.service.test);
  };

  constructor(private service: MyService) {
    window.addEventListener('beforeunload', () => {
      LocalStorage.set('asdasd', window.location.hash.substr(1));
    });
    service.log();
  }
}

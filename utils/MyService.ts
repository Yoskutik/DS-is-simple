import { observable } from 'mobx';
import { Service } from 'typedi';
import { EnableAutoSave } from '@utils/storage';

@Service()
export class MyService {
    @EnableAutoSave()
    @observable test = 'something';

    constructor() {
        console.log(this.test);
        setTimeout(() => console.log(this.test));
    }
}


import { view } from '@mvvm';
import React from 'react';
import AppViewModel from './appViewModel';
import './style.scss';
import { Constructable } from '@utils';
import {action, computed, flow, makeAutoObservable, makeObservable, observable, reaction} from 'mobx';

// export const Printerer = <T extends Constructable>(Clazz: T) => {
//   // const fields: Record<string, any> = {};
//   //
//   // let parent = Clazz;
//   // while (parent.prototype) {
//   //   parent = Object.getPrototypeOf(parent).prototype;
//   // }
//   // Object.entries(Object.getOwnPropertyDescriptors(parent)).forEach(([key, { set, get, value }]) => {
//   //   if (key === 'constructor') return;
//   //   if (set) {
//   //     fields[key] = action;
//   //   } else if (get) {
//   //     fields[key] = computed;
//   //   } else if (typeof value === 'function' && value[Symbol.iterator]) {
//   //     fields[key] = flow;
//   //   }
//   // });
//
//   return class extends Clazz {
//     // constructor(...any) {
//     //   super(...any);
//     //
//     //   Object.entries(Object.getOwnPropertyDescriptors(this)).forEach(([key, { value }]) => {
//     //     if (typeof value === 'function') {
//     //       fields[key] = action;
//     //     } else if (Array.isArray(value)) {
//     //       fields[key] = observable.shallow;
//     //     } else {
//     //       fields[key] = observable;
//     //     }
//     //   });
//     //
//     //   makeObservable(this, fields as any);
//     // }
//   };
// };

const App = view(AppViewModel, ({ viewModel }) => {
  viewModel.log();

  return (
    <div className="app">
      {/* <Header /> */}
      {/* <MainBody /> */}
      {/* <Footer /> */}
    </div>
  );
});

export default App;

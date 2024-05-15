import { createContext, useContext } from 'react';
import ActivityStore from './activityStore';
import CommonStore from './commonStore';
import UserStore from './userStore';
import ModalStore from './modalStore';
import ProfileStore from './profileStore';

interface Store {
  activityStore: ActivityStore;
  userStore: UserStore;
  modalStore: ModalStore;
  commonStore: CommonStore;
  profileStore: ProfileStore;
}

export const store: Store = {
  activityStore: new ActivityStore(),
  userStore: new UserStore(),
  modalStore: new ModalStore(),
  profileStore: new ProfileStore(),
  commonStore: new CommonStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}

import { createContext, useContext } from 'react';
import ActivityStore from './activityStore';
import CommonStore from './commonStore';
import UserStore from './userStore';
import ModalStore from './modalStore';
import ProfileStore from './profileStore';
import CommentStore from './commentStore';

interface Store {
  activityStore: ActivityStore;
  userStore: UserStore;
  modalStore: ModalStore;
  profileStore: ProfileStore;
  commentStore: CommentStore;
  commonStore: CommonStore;
}

export const store: Store = {
  activityStore: new ActivityStore(),
  userStore: new UserStore(),
  modalStore: new ModalStore(),
  profileStore: new ProfileStore(),
  commentStore: new CommentStore(),
  commonStore: new CommonStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}

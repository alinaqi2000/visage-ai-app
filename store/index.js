import { Store as PullStateStore } from 'pullstate';

const Store = new PullStateStore({
  user: null,
  loadingState: true,
  statusbarHeight: 15,
});
 
export default Store;

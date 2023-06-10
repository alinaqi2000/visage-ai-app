import { Store as PullStateStore } from 'pullstate';

const Store = new PullStateStore({
  user: null,
  loadingState: true,
  statusbarHeight: 16,
  timeline: [],
});

export default Store;

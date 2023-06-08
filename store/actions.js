import Store from '.';

export const setUser = user => {
  Store.update(s => {
    s.user = user;
  });
};
export const setLoadingState = loadingState => {
  Store.update(s => {
    s.loadingState = loadingState;
  });
};
export const setStatusbarHeight = height => {
  Store.update(s => {
    s.statusbarHeight = height;
  });
};

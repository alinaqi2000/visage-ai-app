import { Preferences } from '@capacitor/preferences';

// JSON "set" example
export async function setStorage(key, data) {
  await Preferences.set({
    key,
    value: JSON.stringify(data),
  });
}

// JSON "get" example
export async function getStorage(key) {
  const ret = await Preferences.get({ key });
  return JSON.parse(ret.value);
}

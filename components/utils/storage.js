import { Preferences } from '@capacitor/preferences';

export async function setStorage(key, data) {
  await Preferences.set({
    key,
    value: JSON.stringify(data),
  });
}

export async function getStorage(key) {
  const ret = await Preferences.get({ key });
  return JSON.parse(ret.value);
}
export async function setDetections(type, data) {
  const res = await getStorage(type);
  if (data.imageURL) {
    data.imageURL = await getBase64FromUrl(data.imageURL);
  }
  if (data.queryURL) {
    data.queryURL = await getBase64FromUrl(data.queryURL);
  }
  let detections = res || [];
  if (detections) {
    detections = [...detections, { ...data, type, dateTime: new Date() }];
  }
  setStorage(type, detections);
}
export async function deleteDetection(type, index) {
  const res = await getStorage(type);
  let detections = res || [];
  detections.splice(index, 1);
  if (detections) {
    detections = [...detections];
  }
  setStorage(type, detections);
}

const getBase64FromUrl = async url => {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      resolve(base64data);
    };
  });
};

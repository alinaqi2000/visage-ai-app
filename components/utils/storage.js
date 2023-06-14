import { Preferences } from '@capacitor/preferences';
import localforage from 'localforage';
import { db } from '../../firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';

localforage.config({ driver: localforage.WEBSQL, size: 204980736 });

export async function setStorage(key, data) {
  await localforage.setItem(key, data);

  // await Preferences.set({
  //   key,
  //   value: JSON.stringify(data),
  // });
  // await localStorage.setItem(key, JSON.stringify(data));
}

export async function getStorage(key) {
  // const ret = await Preferences.get({ key });
  // return JSON.parse(ret.value);
  // const ret = localStorage.getItem(key);
  // return JSON.parse(ret);
  return localforage.getItem(key);
}
export async function getDetections(userId, type) {
  const citiesRef = collection(db, type);
  const q = query(citiesRef, where('userId', '==', userId));
  return await getDocs(q).then(res => res.docs.map(r => ({ ...r.data(), _id: r.id })));
}
export async function setDetections(type, data) {
  // if (data.imageURL) {
  //   data.imageURL = await getBase64FromUrl(data.imageURL);
  // }
  // if (data.queryURL) {
  //   data.queryURL = await getBase64FromUrl(data.queryURL);
  // }

  await addDoc(collection(db, type), { ...data, type, dateTime: new Date() });
}
export async function deleteDetection(type, item) {
  return await deleteDoc(doc(db, type, item._id));
  // const res = await getStorage(type);
  // let detections = res || [];
  // detections.splice(index, 1);
  // if (detections) {
  //   detections = [...detections];
  // }
  // setStorage(type, detections);
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

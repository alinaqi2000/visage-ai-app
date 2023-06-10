import { motion } from 'framer-motion';
import { CapacitorHttp } from '@capacitor/core';

export const MORPHIS_CLASSES =
  'bg-accent backdrop-filter backdrop-blur-xs bg-opacity-10  border-gray-300';
// export const API_URL = 'https://visage-ai-server.onrender.com/';
export const API_URL = 'http://192.168.100.91:3000/';
export default async function base64ToBlob(dataUrl) {
  let newImage = new Image();
  return new Promise((resolve, reject) => {
    newImage.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = newImage.width;
      canvas.height = newImage.height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(newImage, 0, 0);
      canvas.toBlob(
        blob => {
          if (blob) resolve(blob);
          else reject;
        },
        'image/jpeg',
        1
      );
    };
    newImage.onerror = reject;
    newImage.src = dataUrl;
  });
}

function xmlReq(url, data) {
  var xhr = new XMLHttpRequest();

  return new Promise((resolve, reject) => {
    xhr.onreadystatechange = e => {
      if (xhr.readyState !== 4) {
        return;
      }

      if (xhr.status === 200) {
        console.log('SUCCESS', xhr.responseText);
        resolve(JSON.parse(xhr.responseText));
      } else {
        console.warn('request_error');
      }
    };
    xhr.open('POST', url);
    xhr.setRequestHeader('enctype', `multipart/form-data`);
    xhr.send(data);
  });
}
export const sendData = async (url, data) => {
  // return await xmlReq(url, data);
  // console.log(res);
  // // console.log(data.getBoundary());
  // console.log(data);
  const options = {
    url,
    headers: {
      'content-type': `multipart/form-data`,
    },
    data,
  };
  const res = await CapacitorHttp.post(options);
  return res.data;
};
export function FeatureItem({ children, styles = {} }) {
  const RANDOM_DELAY = Math.random();
  return (
    <motion.div
      style={styles}
      initial={{ scale: 0.8 }}
      animate={{ scale: [0, 1.05, 1] }}
      transition={{
        ease: 'easeInOut',
        delay: RANDOM_DELAY,
        duration: 0.7,
      }}
    >
      {children}
    </motion.div>
  );
}

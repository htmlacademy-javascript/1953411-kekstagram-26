const API_URL = 'https://26.javascript.pages.academy/kekstagram';

function getData (onSuccess) {
  fetch(`${API_URL}/data`).then((response) => response.json()).then((photos)=> onSuccess(photos));
}

function sendData (onSuccess, onFail, body) {
  fetch(API_URL,
    {
      method: 'POST',
      body,
    },
  ).then((responce) => {
    if (responce.ok) {
      onSuccess();
    } else {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    }
  }).catch(() => {
    onFail('Не удалось отправить форму. Попробуйте ещё раз');
  });
}

export {getData, sendData};

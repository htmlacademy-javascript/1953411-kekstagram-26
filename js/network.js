function getData (onSuccess) {
  fetch('https://26.javascript.pages.academy/kekstagram/data').then((response) => response.json()).then((photos)=> onSuccess(photos));
}

function sendData (onSuccess, onFail, body) {
  fetch('https://26.javascript.pages.academ/kekstagram',
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

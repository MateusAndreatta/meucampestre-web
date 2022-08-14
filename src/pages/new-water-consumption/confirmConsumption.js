import React, { useRef, useState } from 'react';
import Button from '../../components/buttons/button';
import { storage } from '../../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import SessionData from '../../utils/sessionData';

export default function ConfirmConsumption(props) {
  const user = SessionData.getUser();
  console.log(user);
  console.log(props.state);
  const [loadingButton, setLoadingButton] = useState(false);

  function sendFileFirebase(file) {
    const storageRef = ref(
      storage,
      `images/water-meter/${btoa(
        `water_meter_${user.id}_${props.state.unidade.id}_${props.state.consumo}`
      )}.jpg`
    );

    const metadata = {
      contentType: file.type,
    };

    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        console.log(error.code);
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          // sendDataToDatabase(downloadURL);
          setLoadingButton(false);
        });
      }
    );
  }

  function onConfirmButtonClick() {
    setLoadingButton(true);
    sendFileFirebase(props.state.image);
  }

  return (
    <div>
      <p className="mb-7">
        Para finalizar sua leitura, confirme os dados abaixo. (Lembrando que os
        dados inseridos não poderão ser alterados).
      </p>
      <p>Chácara selecionada: {props.state.unidade.unidade}</p>
      <p>Consumo informado: {props.state.consumo}</p>
      <div className="mt-7 grid place-content-center">
        <img
          className="w-fill md:w-80"
          src={URL.createObjectURL(props.state.image)}
        />
      </div>

      <div className="my-7 flex flex-row-reverse">
        <Button onClick={onConfirmButtonClick} loading={loadingButton}>
          Finalizar
        </Button>
      </div>
    </div>
  );
}

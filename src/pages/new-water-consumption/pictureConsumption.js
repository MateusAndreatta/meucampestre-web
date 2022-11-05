import React, { useRef } from 'react';
import Button from '../../components/buttons/button';

export default function PictureConsumption(props) {
  const inputFile = useRef(null);

  const onImageChange = (e) => {
    const [file] = e.target.files;
    if (file) {
      props.state.image = file;
      props.onClick();
    }
  };

  return (
    <div>
      <p className="mb-7">
        Para continuar sua leitura, basta tirar a foto do relógio. Lembre-se de
        garantir que a foto esteja com foco e boa iluminação.
      </p>

      <input
        type="file"
        id="file"
        ref={inputFile}
        style={{ display: 'none' }}
        accept="image/png, image/jpeg"
        onChange={onImageChange}
      />

      <div className="mt-7 grid place-content-center">
        <Button onClick={() => inputFile.current.click()}>
          Clique aqui para tirar a foto
        </Button>
      </div>
    </div>
  );
}

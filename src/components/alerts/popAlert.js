import React, { useState, useEffect } from 'react';
import { CheckCircleIcon } from '@heroicons/react/solid';

// TODO: O ideal seria esse icone vir de um componente proprio dele, e passando os parametros
// TODO: - Animar com um fade quando o elemento estiver saindo/entrando da tela
export default function PopAlert(props) {
  const { title, content, delay } = props;
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false);
    }, delay || 5000);
    return () => {
      clearTimeout(timeId);
    };
  }, []);

  return (
    <div>
      {show && (
        <div className="absolute top-10 right-10 mx-auto flex w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-md">
          <div className="flex w-12 items-center justify-center bg-emerald-500">
            <CheckCircleIcon className="h-6 w-6 text-white" />
          </div>

          <div className="-mx-3 px-4 py-2">
            <div className="mx-3">
              <span className="font-semibold text-emerald-500">{title}</span>
              <p className="text-sm text-gray-600">{content}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

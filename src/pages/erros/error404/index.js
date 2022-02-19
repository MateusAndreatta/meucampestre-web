import { Link } from 'react-router-dom';

function Error404() {
  return (
    <div className="flex h-screen">
      <div className="m-auto text-center text-blue-400">
        <h1 className="text-3xl md:text-5xl">
          Erro 404 - Página não encontrada!
        </h1>
        <Link
          to="/"
          className="mt-4 block text-2xl underline hover:text-blue-500 hover:decoration-blue-500 md:text-3xl">
          Voltar ao inicio
        </Link>
      </div>
    </div>
  );
}

export default Error404;

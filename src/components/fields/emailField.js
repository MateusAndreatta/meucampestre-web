export default function EmailField() {
  return (
    <label>
      <span className="required block text-sm font-medium text-slate-700">
        E-mail
      </span>
      <input type="email" className="peer input mt-1 w-full" />
      <p className="invisible mt-2 text-sm text-pink-600 peer-invalid:visible">
        Por favor, informe um e-mail válido
      </p>
    </label>
  );
}

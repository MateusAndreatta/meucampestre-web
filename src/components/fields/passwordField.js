export default function PasswordField() {
  return (
    <label>
      <span className="required block text-sm font-medium text-slate-700">
        Senha
      </span>
      <input type="password" className="peer input mt-1 w-full" />
      <p className="invisible mt-2 text-sm text-pink-600 peer-invalid:visible">
        Senha invalida
      </p>
    </label>
  );
}

import PropTypes from 'prop-types';
import ChevronIcon from '../icons/chevron';
import { bracketSpacing } from 'tailwindcss/prettier.config';

/*
 * Problemas:
 * - Durante a compilação do Tailwind ele adiciona apenas as classes que estão sendo utilizadas no projeto
 * Como as classes são dinamicas: montandas por string (concat), ele acaba por não levar as classes de estilo para o projeto
 * Possivel solução: Criar um playgound com todos os possiveis elementos de UI na tela para forçar o tailwind a baixar as classes
 * https://stackoverflow.com/questions/71186718/force-tailwind-to-include-some-classes-in-build-phase
 * - O ring e o hover, sobem/descem tons da cor principal, como fazer esse calculo?
 * */

function Button(props) {
  let width = props.width || '';
  let height = props.height || '';
  let textColor = `text-${props.textColor || 'white'}`;

  let type = props.type || types.button;
  console.log(textColor);

  let mainColor = 'blue-500';

  // eslint-disable-next-line default-case
  switch (props.style) {
    case styles.primary:
      mainColor = 'primary-500';
      break;
    case styles.secondary:
      mainColor = 'secondary-500';
      break;
    case styles.dark:
      mainColor = 'dark-500';
      break;
    case styles.info:
      mainColor = 'info-600';
      break;
    case styles.danger:
      mainColor = 'danger-500';
      break;
    case styles.light:
      mainColor = 'light-500';
      break;
    case styles.success:
      mainColor = 'success-500';
      break;
  }

  /*
   * Solid
   * Outline
   *
   * Primary
   * Secondary
   * Success
   * Danger
   * Warning
   * Info
   * Light
   * Dark
   *
   * Com icone
   * Somente icone
   *
   * Loading
   * */

  let cssClass = `${width} ${height} ${textColor} bg-${mainColor} button`;
  console.log(cssClass);
  return (
    // Detalhe: esse type não pode entrar o loading
    <button type={type} className={cssClass}>
      {props.children}
      {props.icon}
    </button>
  );
}

const types = {
  button: 'button',
  submit: 'submit',
  reset: 'reset',
  loading: 'loading',
};

const styles = {
  primary: 'primary',
  secondary: 'secondary',
  success: 'success',
  danger: 'danger',
  warning: 'warning',
  info: 'info',
  light: 'light',
  dark: 'dark',
};

Button.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  textColor: PropTypes.string,
  type: PropTypes.oneOf(Object.keys(types)),
  icon: PropTypes.element,
  style: PropTypes.oneOf(Object.keys(styles)),
};

Button.type = types;
Button.style = styles;

export default Button;

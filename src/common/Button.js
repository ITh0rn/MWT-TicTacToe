import {setStyle} from '../utility';

/*Generic Button component, if customStyle is not passed, use default*/
function Button(id,innertext,onClick,customStyle) {

  let button = document.createElement('button');

  let settedStyle = customStyle || style.default;

  setStyle(button, {...settedStyle, ...style.static})

  button.addEventListener('click', onClick);
  button.innerHTML = innertext;

  return button;
}

const style = {
  default: {
    width: '100px',
    height: '100px',
    backgroundColor: 'blue',
  },
  static: {
    outline: 'none',
    cursor: 'pointer'
  },
}

export default Button;

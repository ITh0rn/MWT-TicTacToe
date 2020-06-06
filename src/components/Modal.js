import Button from '../common/Button';
import { setStyle } from '../utility';

/*Win Modal Node*/
let Modal = function() {

  let modal_content = document.createElement('div');
  modal_content.setAttribute('id', 'wind_modal');
  setStyle(modal_content, {
    display: 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgb(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center'
  });

  /*Wind Modal content box*/
  modal_content.appendChild(winModalBox());

  return modal_content;

}

/*Modal Box*/
function winModalBox() {
  let modalBox = document.createElement('div');

  let modalbody = document.createElement('div');
  setStyle(modalbody, {
    padding: '50px',
  })

  modalbody.appendChild(innerText("Woohoo! \r\n X Win's motherfucker"));
  modalbody.appendChild(newGameBtn())
  modalbody.appendChild(closeBtn());

  modalBox.appendChild(modalbody);

  setStyle(modalBox, styles.modalBox);

  return modalBox;
}

/*Modal box inner text (Winning label)*/
function innerText(value) {
  let text = document.createElement('h3');
  text.id = 'inner-text';
  text.innerText = value;

  setStyle(text, styles.innerText)

  return text;
}

/*close modal button*/
function closeBtn() {
  let spanContent = '<span aria-hidden=\"true\">×</span>';
  let closeHandler = function() {
    document.getElementById('wind_modal').style.display = 'none';
  };

  return new Button('close', spanContent, closeHandler, styles.closeBtn)
}

/*New Game button*/
function newGameBtn() {
  let newGameHandler = function() {
    location.reload();
  };

  return new Button("new-game", "Rigioca", newGameHandler, styles.newGameBtn);
}

export { Modal, innerText, newGameBtn};

const styles = {
  modalBox: {
    borderRadius: '25px',
    width: '400px',
    position: 'relative',
    backgroundColor: 'white',
  },
  innerText: {
    fontFamily: 'Varela Round, sans-serif',
    fontWeight: 'normal',
    textAlign: 'center'
  },
  closeBtn: {
    color: '#e74c3c',
    backgroundColor: '#fff',
    fontSize: '28px',
    textShadow: 'none',
    lineHeight: '33px',
    height: '33px',
    width: '33px',
    borderRadius: '50%',
    border: 'none',
    opacity: 1,
    boxShadow: '0 0 5px #555',
    position: 'absolute',
    right: '-10px',
    top: '-10px',
    zIndex: 1,
  },
  newGameBtn: {
    color: '#fff',
    backgroundColor: '#36BDEE',
    fontSize: '18px',
    textTransform: 'uppercase',
    padding: '10px',
    border: '0 solid #222',
    borderRadius: '50px',
    display: 'block',
    position: 'relative',
    zIndex: 1,
    margin: '0 auto',
  }
};


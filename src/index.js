import {setStyle} from './utility';
import {Modal, newGameBtn} from './components/Modal';
import Dashboard from './components/Dashboard';
import Cell from './components/Cell';
import Marker from './components/Marker';
import Button from './common/Button';

const winCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];


let symbol = false;
let freespacescounter = 9;
let isfinishround = false;

const myStorage = window.localStorage;

{

  let TicTacToe = function() {
    let context = document.getElementById('root');

    let tictacdiv = document.createElement('div');
    tictacdiv.id = 'grid-content';

    setStyle(tictacdiv, {
      display: 'grid',
      justifyContent: 'center',
      alignContent: 'center',
      gridTemplateColumns: 'repeat(3, auto)',
      marginBottom: '50px'
    });

    /*Generate game cells*/
    for (let i = 0; i < 9; i++) {

      let cell = new Cell(i);
      /*Passing custom event handler to Cell class method*/
      cell.handleEvent('click', handleClick, true)
      cell.handleEvent('mouseenter', handleOver);
      cell.handleEvent('mouseleave', removeOver);

      tictacdiv.appendChild(cell.getNode());

    }

    /*Append Dashboard and Grid Game to root div*/
    context.appendChild(new Dashboard());
    context.appendChild(tictacdiv);
    context.appendChild(new Button("new-game", "Rigioca", function() {
      location.reload();
    }, styles.newGameBtn));
    context.parentElement.appendChild(Modal())


    /*Storage, check if an item is already setted*/

    if (myStorage.getItem('O') === null) {
      myStorage.setItem('O','0');
      myStorage.setItem('X','0');
    }

    document.getElementById('O-counter').innerText = myStorage.getItem('O');
    document.getElementById('X-counter').innerText = myStorage.getItem('X');

  };

  window.addEventListener('load', TicTacToe, true);

   /******* Events Handler *******/

  function handleClick(e) {
    let cell = e.target;
    placeMarker(cell, symbol);
  }

  function handleOver(e) {
    let cell = e.target;
    placeHolder(cell, symbol);
  }

  function removeOver(e) {
    if (!isfinishround) {
      let cell = e.target;
      let child = cell.firstChild;
      if (child.getAttribute('type') === 'placeholder') {
        cell.removeChild(child);
      }
    }
  }

  /******* Finish *******/

  /*Show the current marker position before placing it*/
  function placeHolder(cell, currentSymbol) {
    if (!isfinishround) {
      let child = cell.firstChild;
      if (child === null) {
        let marker = new Marker(currentSymbol);
        cell.appendChild(marker.getNode());
      }
    }
  }

  /*Place a Marker (current round: O or X)*/
  function placeMarker(cell, currentSymbol) {
    if (!isfinishround) {
      let firstChild = cell.firstChild;

      if (firstChild.getAttribute("type") === 'placeholder') {
        let marker = new Marker(currentSymbol, false);
        cell.removeChild(firstChild);
        cell.appendChild(marker.getNode())
      }

      freespacescounter = freespacescounter - 1;
      symbol = !symbol;

      checkStatus(currentSymbol);
    }

  }

  /*Check the status, if one cell's left, check if it's draw (pareggio)*/
  function checkStatus(marker) {
    let cells = document.querySelectorAll('.tic-cell');
    let symbol = marker ? 'O' : 'X';

    if (checkwin(cells,symbol)) {
      /*Win logic*/
      isfinishround = true;
      setWinLabelStatus(symbol);
      setCounter(symbol);
    } else if (freespacescounter === 0) {
      /*Draw logic*/
      setWinLabelStatus('pareggio')
    }
  }

  /*Check if one current combination check a winner combination*/
  function checkwin(cells,symbol) {
    return winCombination.some((combination) => {
      return combination.every(function(idx) {
        if (cells[idx].firstChild !== null) {
          return cells[idx].firstChild.getAttribute('value') === symbol;
        } else {
          return false;
        }
      });
    });
  }

  /*Set the modal view status*/
  function setWinLabelStatus(status) {

    let winModal = document.getElementById('wind_modal');
    document.getElementById('inner-text').innerText = status !== 'pareggio' ?
        `Woohoo! \r\n ${status} vince il turno` :
        'Pareggio';
    winModal.style.display = 'flex';
  }

  /*Set wins counter for each label and update local storage*/
  function setCounter(status) {
    let counter = document.getElementById(`${status}-counter`);
    counter.innerText = (parseInt(counter.innerText) + 1).toString();
    myStorage.setItem(status,(parseInt(myStorage.getItem(status)) + 1).toString());
  }
}

const styles = {
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
    margin: '0 auto',
  }
}









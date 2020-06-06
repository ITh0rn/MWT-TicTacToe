import {setStyle} from '../utility';

let Cell = function(idx) {

  let cell;

  let init = (function() {

    cell = document.createElement("div");
    cell.setAttribute("class", "tic-cell");

    let borderDimension = '4px solid';

    let customstyle = {};

    /*Set grid layout and border for each cell based on it's position*/
    switch (idx) {
      case 1:
        customstyle = {
          borderLeft: borderDimension,
          borderRight: borderDimension
        }
        break;
      case 3:
        customstyle = {
          borderTop: borderDimension,
          borderBottom: borderDimension
        }
        break;
      case 4:
        customstyle = {
          border: borderDimension
        }
        break;
      case 5:
        customstyle = {
          borderTop: borderDimension,
          borderBottom: borderDimension
        }
        break;
      case 7:
        customstyle = {
          borderRight: borderDimension,
          borderLeft: borderDimension
        }
        break;
      default:
        // code block
    }

    this.setStyle(cell, {
      ...style.default,
      ...customstyle
    })

  }).bind(this)


  this.getNode = function() {
    return cell;
  }

  this.handleEvent = function(eventid, callback, once = false) {
    cell.addEventListener(eventid, callback, { once })
  }

  init();

}

const style = {
  default: {
    width: '100px',
    height: '100px',
    backgroundColor: 'transparent',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
}

Cell.prototype.setStyle = setStyle;

export default Cell;

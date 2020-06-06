import {setStyle} from '../utility';

/*Marker img and logic generate*/
class Marker {

  constructor(type,placeholder=true) {

    this.symbol = type ? 'O' : 'X';

    this.node = document.createElement('img');
    this.node.setAttribute('src', `assets/img/${this.symbol}.png`)
    this.node.setAttribute("type", placeholder ? 'placeholder' : 'definitive');
    this.node.setAttribute("value", this.symbol);


    this.setStyle(this.node, {...style, ...placeholder ? { opacity: 0.3 } : null})

    this.node.addEventListener('click', function(event) {
        event.preventDefault();
    })

  }

  getSymbol() {
    return this.symbol;
  }

  getNode() {
    return this.node;
  }

}

const style = {
  zIndex: -1000,
  width: '80%',
}

Marker.prototype.setStyle = setStyle;

export default Marker;

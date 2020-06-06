import {setStyle} from '../utility';
import Marker from './Marker';

/*Dashboard div*/
function Dashboard() {
  let node = document.createElement('div');
  node.id = 'dashboard';

  setStyle(node, {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginBottom: '200px'
  })

  /*Generate a counter for each label (X-O)*/
  for (let i = 0; i<2; i++) {
    node.appendChild(symbolCounter(i));
  }

  return node;
}

/*Generate marker label*/
function symbolCounter(idx) {

  let counter = document.createElement('div');
  counter.appendChild(new Marker(idx !== 0, false).getNode());
  counter.appendChild(labelCounter(idx))

  setStyle(counter, styles.markerStyle);

  return counter;
}

/*Generate Marker Counter*/
function labelCounter(idx) {

  let labelCounter = document.createElement('h3');
  labelCounter.id = `${idx === 0 ? 'X' : 'O'}-counter`
  labelCounter.innerText = `0`

  setStyle(labelCounter, styles.labelStyle);

  return labelCounter;

}

const styles = {
  labelStyle: {
    fontFamily: 'Varela Round, sans-serif',
    fontWeight: 'bold'
  },
  markerStyle: {
    height: '100px',
    width: '100px',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column'
  }
}

export default Dashboard;

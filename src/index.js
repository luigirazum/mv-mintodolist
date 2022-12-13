// Lodash, now imported by this script
import _ from 'lodash';

// Import css styles for our project
import './style.css';

function component() {
  const element = document.createElement('div');

  // Lodash, use of .join() method
  element.innerHTML = _.join(['Hello', 'webpack', 'with WebpackDevServer working OK ✔.'], ' ');
  element.classList.add('hello');

  return element;
}

document.body.appendChild(component());
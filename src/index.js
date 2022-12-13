// Lodash, now imported by this script
import _ from 'lodash';

function component() {
  const element = document.createElement('div');

  // Lodash, use of .join() method
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());
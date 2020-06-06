/*Takes a style object and set html element style properties */

let setStyle = (element, style) => {
  for (let property in style) {
    element.style[property] = style[property];
  }
};

export { setStyle };

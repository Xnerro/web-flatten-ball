const container = document.createElement('div');
container.classList.add('container');
const ball = document.createElement('div');
ball.classList.add('ball');
var basket = [];
let x = 0;
let i = 0;

color = ['red', 'green', 'blue', 'yellow'];

const addContainer = (box, y) => {
  while (i < y) {
    while (x < 4) {
      container.appendChild(ball.cloneNode(true));
      x++;
    }
    box.appendChild(container.cloneNode(true));
    i++;
  }
};

const getColor = color => {
  let colors = [];
  for (let i = 0; i < 4; i++) {
    if (colors[0] == undefined) {
      colors.push({
        color1: [color[1]],
        color2: [color[2]],
        color3: [color[3]],
        color4: [color[0]],
      });
    } else {
      colors[0].color1.push(color[1]);
      colors[0].color2.push(color[2]);
      colors[0].color3.push(color[3]);
      colors[0].color4.push(color[0]);
    }
  }

  let tempcolor = [].concat(
    colors[0].color1,
    colors[0].color2,
    colors[0].color3,
    colors[0].color4
  );

  const fixcolor = tempcolor.sort(function (a, b) {
    return 0.5 - Math.random();
  });

  return fixcolor;
};

let ConvertStringToHTML = function (str) {
  let parser = new DOMParser();
  let doc = parser.parseFromString(str, 'text/html');
  return doc.body.firstChild;
};

const checkWin = container => {
  console.log(container.children);
};

document.addEventListener('DOMContentLoaded', function () {
  const box = document.querySelector('.box');
  addContainer(box, 4);
  const ball = document.querySelectorAll('.ball');
  const fixcolor = getColor(color);
  i = 0;
  ball.forEach(function (item, index) {
    item.style.backgroundColor = fixcolor[index];
    if (basket[i] == undefined) {
      basket.push({
        [`container-${i}`]: [],
      });
    } else if (basket[i][`container-${i}`].length == 4) {
      i++;
      basket.push({
        [`container-${i}`]: [],
      });
    }
    basket[i][`container-${i}`].push(item);
  });

  const container = document.querySelectorAll('.container');
  container.forEach(function (item, index) {
    item.addEventListener('click', function () {
      console.log(index);
      if (localStorage.getItem('item') === null) {
        try {
          localStorage.setItem('item', `${item.children.item(0).outerHTML}`);
          item.children.item(0).remove();
        } catch (error) {
          console.log(error);
        }
      } else if (
        item.children.length < 4 &&
        ConvertStringToHTML(localStorage.getItem('item'))?.style
          .backgroundColor === item.children.item(0)?.style.backgroundColor &&
        localStorage.getItem('item') !== null
      ) {
        try {
          item.appendChild(ConvertStringToHTML(localStorage.getItem('item')));
          localStorage.removeItem('item');
        } catch (error) {
          console.log(error);
        }
      } else if (item.children.length == 0) {
        try {
          item.appendChild(ConvertStringToHTML(localStorage.getItem('item')));
          localStorage.removeItem('item');
        } catch (error) {
          console.log(error);
        }
      }
      checkWin(container);
    });
  });
});

document
  .getElementsByClassName('btn')[0]
  .addEventListener('click', function () {
    window.location.reload();
  });

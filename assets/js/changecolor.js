'use strict';
var animationTriangle12 = {
    container: document.getElementById('triangle12'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: transitionTriangle1,
    rendererSettings: {
        preserveAspectRatio:'none'
    }
};

var loadTriangle12 = bodymovin.loadAnimation(animationTriangle12);

//CHANGE COLOR

var sheet = document.styleSheets[1];
var rules = sheet.cssRules || sheet.rules;

var colorControl = document.getElementById('triangle12');

var color1 = document.getElementById('products_change_color_1');
var color2 = document.getElementById('products_change_color_2');
var color3 = document.getElementById('products_change_color_3');



function changeRuleColor(rule, color) {
  var products_change_color = colorControl.getElementsByClassName('animation_svg_color_'+rule);
  for (var i = 0; i < products_change_color.length; i++) {
    products_change_color[i].style.fill = '#' + color;
    products_change_color[i].style.stroke = '#' + color;
  }
}

function checkColor() {
  changeRuleColor(0, color1.value);
  changeRuleColor(1, color1.value);
  changeRuleColor(2, color2.value);
  changeRuleColor(3, color3.value);
}

setInterval(checkColor, 10);

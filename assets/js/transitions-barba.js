'use strict';
//--------------------------------- Start Transition for BARBA
var animationUrl = {
    container: document.getElementById('ondemand/index-3.html'), // This name ID in HTML, where rendering animation
    renderer: 'svg',
    loop: false,
    autoplay: false,
    animationData: transitionShutter5, // This NAME code animation SVG. Change it that would change animation.
    rendererSettings: {
        preserveAspectRatio: 'none'
    }
};

var loadAnimationUrl = bodymovin.loadAnimation(animationUrl); // Activation rendering animation

Barba.Pjax.start(); // Activation barba.js

var urlTransition = Barba.BaseTransition.extend({
    start: function() {
        Promise
            .all([this.newContainerLoading, this.animIn()])
            .then(this.animOut.bind(this));
    },

    animIn: function() {
        loadAnimationUrl.setDirection(1);
        loadAnimationUrl.play();
    },

    animOut: function() {
        var _this = this;

        function func() {
            loadAnimationUrl.setDirection(-1);
            loadAnimationUrl.play();
            _this.done();
        }
        setTimeout(func, 750); // 750 - is delay in ms. Change it based on transition`s duration and your server`s speed.
    }
});

Barba.Pjax.getTransition = function() {
    return urlTransition;
};
//--------------------------------- END Transition for BARBA

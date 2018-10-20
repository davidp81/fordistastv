'use strict';
//--------------------------------- Start Transition MODAL
var transitionModal = {
    container: document.getElementById('modal-transition__button-open'), // This name ID in HTML, where rendering animation
    renderer: 'svg',
    loop: false,
    autoplay: false,
    animationData: transitionCircle2, // This NAME code animation SVG. Change it that would change animation.
    rendererSettings: {
        preserveAspectRatio: 'none'
    }
};

var modalAnimation = bodymovin.loadAnimation(transitionModal); // Activation rendering animation

// START MODAL CODE
var modalTransitionButtonOpen = document.getElementById('modal-transition__button-open'); // Name ID Button in HTML
var modalTransitionContainer = document.getElementById('modal-transition__container'); // Name ID Container in HTML
var modalTransitionButtonClose = document.getElementsByClassName('modal-transition__close')[0]; // Name ID Close Button in HTML

// When the user clicks on Button "Open Modal", open the modal
modalTransitionButtonOpen.onclick = function() {
    modalAnimation.setDirection(1);
    modalAnimation.play();
    modalTransitionContainer.classList.add('modal-transition_open');
};

// When the user clicks on X in Modal, close the modal
modalTransitionButtonClose.onclick = function() {
    modalAnimation.setDirection(-1);
    modalAnimation.play();
    modalTransitionContainer.classList.remove('modal-transition_open');
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modalTransitionContainer) {
        modalAnimation.setDirection(-1);
        modalAnimation.play();
        modalTransitionContainer.classList.remove('modal-transition_open');
    }
};

//--------------------------------- END Transition MODAL

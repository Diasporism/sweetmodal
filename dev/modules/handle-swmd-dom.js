import { hexToRgb } from './utils';
import { removeClass, getTopMargin, fadeIn, show, addClass } from './handle-dom';
import defaultParams from './default-params';

var modalClass   = '.sweet-modal';
var overlayClass = '.sweet-overlay';

/*
 * Add modal + overlay to DOM
 */
import injectedHTML from './injected-html';

var sweetModalInitialize = function() {
  var sweetWrap = document.createElement('div');
  sweetWrap.innerHTML = injectedHTML;

  // Append elements to body
  while (sweetWrap.firstChild) {
    document.body.appendChild(sweetWrap.firstChild);
  }
};

/*
 * Get DOM element of modal
 */
var getModal = function() {
  var $modal = document.querySelector(modalClass);

  if (!$modal) {
    sweetModalInitialize();
    $modal = getModal();
  }

  return $modal;
};

/*
 * Get DOM element of input (in modal)
 */
var getInput = function() {
  var $modal = getModal();
  if ($modal) {
    return $modal.querySelector('input');
  }
};

/*
 * Get DOM element of overlay
 */
var getOverlay = function() {
  return document.querySelector(overlayClass);
};

/*
 * Add box-shadow style to button (depending on its chosen bg-color)
 */
var setFocusStyle = function($button, bgColor) {
  var rgbColor = hexToRgb(bgColor);
  $button.style.boxShadow = '0 0 2px rgba(' + rgbColor + ', 0.8), inset 0 0 0 1px rgba(0, 0, 0, 0.05)';
};

/*
 * Animation when opening modal
 */
var openModal = function(callback) {
  var $modal = getModal();
  fadeIn(getOverlay(), 10);
  show($modal);
  addClass($modal, 'showSweetModal');
  removeClass($modal, 'hideSweetModal');

  window.previousActiveElement = document.activeElement;

  var timer = $modal.getAttribute('data-timer');

  if (timer !== 'null' && timer !== '') {
    var timerCallback = callback;
    $modal.timeout = setTimeout(function() {
      var doneFunctionExists = ((timerCallback || null) && $modal.getAttribute('data-has-done-function') === 'true');
      if (doneFunctionExists) {
        timerCallback(null);
      }
      else {
        sweetModal.close();
      }
    }, timer);
  }
};

/*
 * Reset the styling of the input
 * (for example if errors have been shown)
 */
var resetInput = function() {
  resetInputError();
};

var resetInputError = function(event) {
  // If press enter => ignore
  if (event && event.keyCode === 13) {
    return false;
  }

  var $modal = getModal();

  var $errorContainer = $modal.querySelector('.sm-error-container');
  removeClass($errorContainer, 'show');
};


/*
 * Set "margin-top"-property on modal based on its computed height
 */
var fixVerticalPosition = function() {
  var $modal = getModal();
  $modal.style.marginTop = getTopMargin($modal);
};


export {
  sweetModalInitialize,
  getModal,
  getOverlay,
  getInput,
  setFocusStyle,
  openModal,
  resetInput,
  resetInputError,
  fixVerticalPosition
};

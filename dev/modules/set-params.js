var alertTypes = ['error', 'warning', 'info', 'success', 'input', 'prompt'];
var alertSizes = ['small', 'medium', 'large'];

import {
  isIE8
} from './utils';

import {
  getModal,
  getInput,
  setFocusStyle
} from './handle-swmd-dom';

import {
  hasClass, addClass, removeClass,
  escapeHtml,
  _show, show, _hide, hide
} from './handle-dom';


/*
 * Set type, text and actions on modal
 */
var setParameters = function(params) {
  var modal = getModal();
  var $title = modal.querySelector('h2');
  var $cancelBtn = modal.querySelector('button.cancel');
  var $confirmBtn = modal.querySelector('button.confirm');

  /*
   * Title
   */
  $title.innerHTML = params.html ? params.title : escapeHtml(params.title).split('\n').join('<br>');

  /*
   * Custom class
   */
  if (params.customClass) {
    addClass(modal, params.customClass);
    modal.setAttribute('data-custom-class', params.customClass);
  }

  /*
   * Modal Size
   */
  if (params.size) {
    let validSize = false;

    for (let i = 0; i < alertSizes.length; i++) {
      if (params.size === alertSizes[i]) {
        validSize = true;
        break;
      }
    }

    if (!validSize) {
      logStr('Unknown alert size: ' + params.size);
      return false;
    }

    // Set modal dimensions
    switch (params.size) {
      case 'small':
        addClass(modal, 'small');
        break;

      case 'medium':
        addClass(modal, 'medium');
        break;

      case 'large':
        addClass(modal, 'large');
        break;
    }
  }

  /*
   * Show cancel button?
   */
  modal.setAttribute('data-has-cancel-button', params.showCancelButton);
  if (params.showCancelButton) {
    $cancelBtn.style.display = 'inline-block';
  } else {
    hide($cancelBtn);
  }

  /*
   * Show confirm button?
   */
  modal.setAttribute('data-has-confirm-button', params.showConfirmButton);
  if (params.showConfirmButton) {
    $confirmBtn.style.display = 'inline-block';
  } else {
    hide($confirmBtn);
  }

  /*
   * Custom text on cancel/confirm buttons
   */
  if (params.cancelButtonText) {
    $cancelBtn.innerHTML = escapeHtml(params.cancelButtonText);
  }
  if (params.confirmButtonText) {
    $confirmBtn.innerHTML = escapeHtml(params.confirmButtonText);
  }

  /*
   * Custom color on confirm button
   */
  if (params.confirmButtonColor) {
    // Set confirm button to selected background color
    $confirmBtn.style.backgroundColor = params.confirmButtonColor;

    // Set the confirm button color to the loading ring
    $confirmBtn.style.borderLeftColor  = params.confirmLoadingButtonColor;
    $confirmBtn.style.borderRightColor = params.confirmLoadingButtonColor;

    // Set box-shadow to default focused button
    setFocusStyle($confirmBtn, params.confirmButtonColor);
  }

  /*
   * Allow outside click
   */
  modal.setAttribute('data-allow-outside-click', params.allowOutsideClick);

  /*
   * Callback function
   */
  var hasDoneFunction = params.doneFunction ? true : false;
  modal.setAttribute('data-has-done-function', hasDoneFunction);

  /*
   * Animation
   */
  if (!params.animation) {
    modal.setAttribute('data-animation', 'none');
  } else if (typeof params.animation === 'string') {
    modal.setAttribute('data-animation', params.animation); // Custom animation
  } else {
    modal.setAttribute('data-animation', 'pop');
  }

  /*
   * Timer
   */
  modal.setAttribute('data-timer', params.timer);
};

export default setParameters;

import { stopEventPropagation, fireClick } from './handle-dom';
import { setFocusStyle } from './handle-swmd-dom';


var handleKeyDown = function(event, params, modal) {
  var e = event || window.event;
  var keyCode = e.keyCode || e.which;

  if (keyCode === 13) {
    // ENTER
    var okButton = modal.querySelector('button.confirm');
    fireClick(okButton, e);
  } else if (keyCode === 27 && params.allowEscapeKey === true) {
    // ESCAPE
    var cancelButton = modal.querySelector('button.cancel');
    fireClick(cancelButton, e);
  }
};

export default handleKeyDown;

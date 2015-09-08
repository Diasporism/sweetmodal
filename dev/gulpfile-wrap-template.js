;(function(window, document, undefined) {
  "use strict";

  <%= contents %>

  /*
   * Use SweetAlert with RequireJS
   */

  if (typeof define === 'function' && define.amd) {
    define(function () {
      return sweetModal;
    });
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = sweetModal;
  }

})(window, document);

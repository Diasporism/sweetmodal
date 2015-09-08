var injectedHTML =

  // Dark overlay
  `<div class="sweet-overlay" tabIndex="-1"></div>` +

  // Modal
  `<div class="sweet-modal">` +

    // Title, text and input
    `<h2>Title</h2>` +

    // Input errors
    `<div class="sm-error-container">
      <div class="icon">!</div>
      <p>Not valid!</p>
    </div>` +

    // Cancel and confirm buttons
    `<div class="sm-button-container">
      <button class="cancel" tabIndex="2">Cancel</button>
      <div class="sm-confirm-button-container">
        <button class="confirm" tabIndex="1">OK</button>` +

        // Loading animation
        `<div class="la-ball-fall">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>` +

  // End of modal
  `</div>`;

export default injectedHTML;

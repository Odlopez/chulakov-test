"use strict";window.popup=function(e){var n=document.querySelector("."+window.constants.CLASSES.TEMPLATE).querySelector("."+window.constants.CLASSES.POPUP).cloneNode(!0),t=n.querySelector("."+window.constants.CLASSES.POPUP_MESSAGE),o=function(){n.parentElement&&(document.body.removeChild(n),n.removeEventListener("click",o),document.removeEventListener("keydown",d))},d=function(e){e.preventDefault(),e.keyCode===window.constants.KEY_CODE.ESC&&o()};t.textContent=e,document.body.appendChild(n),setTimeout(function(){o()},window.constants.CLOSING_POPUP_TIME),n.addEventListener("click",o),document.addEventListener("keydown",d)};
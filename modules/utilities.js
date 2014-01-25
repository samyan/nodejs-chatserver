/**
 * Utilities Class
 */

/**
 * Constructor 
 */
var Utilities = function() {}

/**
 * Escape html tags 
 *
 * @param {text}
 * @return string
 */
Utilities.prototype.escapeHtml = function(text) {
	return text
	      .replace(/&/g, "&amp;")
	      .replace(/</g, "&lt;")
	      .replace(/>/g, "&gt;")
	      .replace(/"/g, "&quot;")
	      .replace(/'/g, "&#039;");
}

module.exports = Utilities;
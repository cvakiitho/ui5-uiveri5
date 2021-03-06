var webdriver = require('selenium-webdriver');
var clientsidescripts = require('../scripts/clientsidescripts');

// "environment" setup on different stages of a screenshot creation
// has methods to modify element state, browser state, etc
function ScreenshotSetup(config, logger) {

  // prepare the page before a screenshot is taken, depending on instances configuration
  // returns webdriver.promise
  this.beforeScreenshot = function () {
    var that = this;
    return that._hideScrollbars()
      .then(function () {
        that._forceDelay();
      });
  };

  this._forceDelay = function () {
    if (config.screenshotSleep) {
      logger.debug('Browser sleep for ' + config.screenshotSleep + 'ms');
      return browser.sleep(config.screenshotSleep);
    } else {
      return webdriver.promise.fulfilled();
    }
  };

  this._hideScrollbars = function () {
    if (config.hideScrollbars) {
      logger.debug('Hide page scrollbars');
      return browser.executeScript(clientsidescripts.hideScrollbars)
        .catch(function (oError) {
          logger.debug('Could not hide scrollbars. Details: ' + oError);
        });
    } else {
      return webdriver.promise.fulfilled();
    }
  };

}

module.exports = ScreenshotSetup;

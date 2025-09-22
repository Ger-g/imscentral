/**
 * Created by thoma_000 on 29.03.2016.
 */

// Assets
require('./library/images/throbber.gif');

// Inline css
require('./library/styles/h5p.css');
require('./library/styles/h5p-confirmation-dialog.css');
require('./library/styles/h5p-core-button.css');

global.H5PIntegration = {};

// Require js
require('script!./library/js/jquery');
require('script!./library/js/h5p');
require('script!./library/js/h5p-event-dispatcher');
require('script!./library/js/h5p-x-api-event');
require('script!./library/js/h5p-x-api');
require('script!./library/js/h5p-content-type');


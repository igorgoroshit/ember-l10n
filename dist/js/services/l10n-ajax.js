define('ember-l10n/services/l10n-ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  'use strict';

  exports['default'] = _emberAjaxServicesAjax['default'].extend({
    host: '',
    namespace: ''
  });
});
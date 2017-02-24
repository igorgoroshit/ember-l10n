define('ember-l10n/helpers/n', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  var Helper = _ember['default'].Helper;
  var inject = _ember['default'].inject;
  var isNone = _ember['default'].isNone;
  var get = _ember['default'].get;
  var merge = _ember['default'].merge;
  var EmberString = _ember['default'].String;
  var observer = _ember['default'].observer;

  /**
   * This helper provides gettext pluralization for message ids.
   * It takes singular and plural message ids as well as actual
   * amount as positional arguments. All placeholders can be
   * provided through named arguments (hash).
   *
   * ```html
   * {{n '{{count}} apple' '{{count}} apples' someBoundProperty}}
   * ```
   *
   * @namespace Helper
   * @class N
   * @extends Ember.Helper
   * @public
   */
  exports['default'] = Helper.extend({
    l10n: inject.service(),

    compute: function compute(_ref, hash) {
      var msgid = _ref[0];
      var msgidPlural = _ref[1];
      var count = _ref[2];

      if (isNone(msgid)) {
        return msgid;
      }

      // If hash.count is not set, use the provided count positional param
      if (!get(hash, 'count')) {
        // hash should not be mutated
        hash = merge({}, hash);
        hash.count = count;
      }

      var trans = this.get('l10n').n(msgid, msgidPlural, count, hash);
      return EmberString.htmlSafe(trans);
    },

    _watchLocale: observer('l10n.locale', function () {
      this.recompute();
    })
  });
});
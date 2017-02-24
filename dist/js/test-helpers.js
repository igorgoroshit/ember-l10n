define('ember-l10n/test-helpers', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  function _strfmt(string, hash) {
    var _this = this;

    // don't process empty hashes
    if (_ember['default'].isNone(hash)) {
      return string;
    }

    // find and replace all {{placeholder}}
    var pattern = /{{\s*([\w]+)\s*}}/g;
    var replace = function replace(idx, match) {
      var value = hash[match];
      if (_ember['default'].isNone(value)) {
        return '{{' + match + '}}';
      }

      if (_ember['default'].typeOf(value) === 'string') {
        value = _this.get('_gettext').gettext(value);
      }

      return value;
    };

    return string.replace(pattern, replace);
  }

  exports['default'] = function (context) {
    var tHelper = _ember['default'].Helper.helper(function (_ref) {
      var str = _ref[0];

      return _strfmt(str);
    });

    var nHelper = _ember['default'].Helper.helper(function (_ref2) {
      var strSingular = _ref2[0];
      var strPlural = _ref2[1];
      var count = _ref2[2];

      var str = count > 1 ? strPlural : strSingular;
      return _strfmt(str);
    });

    context.register('helper:t', tHelper);
    context.register('helper:n', nHelper);
  };
});
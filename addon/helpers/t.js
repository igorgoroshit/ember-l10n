import Ember from 'ember';

/**
 * This helper provides gettext singularization for message ids.
 * It takes singular message id as positional arguments. All
 * placeholders can be provided through named arguments.
 *
 * ```html
 * {{t 'Your current role: {{role}}' role=someBoundProperty}}
 * ```
 *
 * @namespace Helper
 * @class T
 * @extends Ember.Helper
 * @public
 */
export default Ember.Helper.extend({
  l10n: Ember.inject.service(),

  compute([msgid], hash) {
    if (Ember.isNone(msgid)) {
      return msgid;
    }

    //replace \r\n with \n (normalize)
    msgid = msgid.replace(/\r\n/g, "\n");
    //replace tab with whitespace
    msgid = msgid.replace(/\t/g, " ");
    //replace multiple whitespace with one whitespace
    msgid = msgid.replace(/ {2,}/g, " ");
    //replace whitespace follow by \n with \n
    msgid = msgid.replace(/ {1,}\n/g, "\n");
    //replace \n follwed by whitespace with \n
    msgid = msgid.replace(/\n {1,}/g, "\n")
    //normalize for object keys
    //msgid = msgid.replace(/\n/g, "\\n");
      
    let trans = this.get('l10n').t(msgid, hash);
    return Ember.String.htmlSafe(trans);
  },

  _watchLocale: Ember.observer(
    'l10n.locale',
    function() {
      this.recompute();
    }
  )
});

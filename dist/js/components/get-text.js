define('ember-l10n/components/get-text', ['exports', 'ember', '../templates/get-text'], function (exports, _ember, _templatesGetText) {
  'use strict';

  var get = _ember['default'].get;
  var Component = _ember['default'].Component;
  var getTypeOf = _ember['default'].typeOf;
  var isEmpty = _ember['default'].isEmpty;

  /**
   * A simple helper component to include dynamic parts - mostly link-to helper - within gettext message ids.
   *
   * ```html
   * {{#get-text message=(t "My translation with {{dynamicLink 'optional link text'}} and {{staticLink}}") as |text placeholder|}}
   *  {{!-- You can omit the if helper if you have only one dynamic part --}}
   *  {{~#if (eq placeholder 'myLink')}}
   *    {{~#link-to 'my-route'}}
   *      {{~text}} {{!-- will render 'optional link text' so that it's contained in PO file! --}}
   *    {{~/link-to~}}
   *  {{~/if~}}
   *  {{~#if (eq placeholder 'staticLink')}}
   *    <a href="http://www.google.com">Google</a>
   *  {{~/if~}}
   * {{/get-text}}
   * ```
   *
   * @namespace Component
   * @class GetText
   * @extends Ember.Component
   * @public
   */
  exports['default'] = Component.extend({

    tagName: '',
    layout: _templatesGetText['default'],

    // -------------------------------------------------------------------------
    // Attributes

    /**
     * The message id string, which should use one of the gettext
     * translations method as subexpression when being passed in!
     *
     * @attribute message
     * @type {String}
     * @public
     */
    message: '',

    /**
     * Whether parsed strings should be escaped with three curly brackets
     * or not. This should be set to true if your message contains HTML.
     *
     * @attribute escapeText
     * @type {String}
     * @public
     */
    escapeText: false,

    // -------------------------------------------------------------------------
    // Properties

    /**
     * Collection of all message parts splitted
     * into normal text pieces and all
     * placeholders from message id.
     *
     * @property messageParts
     * @type {Array}
     * @public
     */
    messageParts: null, // lazy initialized!

    // -------------------------------------------------------------------------
    // Methods

    /**
     * Parses message id and splits it
     * up into corresponding parts.
     *
     * @method didReceiveAttrs
     * @return {Void}
     * @public
     */
    didReceiveAttrs: function didReceiveAttrs() {
      this._super.apply(this, arguments);
      var message = get(this, 'message');

      if (!message) {
        console.error('get-text.js: You need to provide a "message" attribute containing a gettext message!');
        return;
      }

      if (getTypeOf(message) !== 'string') {
        try {
          message = message.toString();
        } catch (e) {
          console.error('get-text.js: "message" must be either a string or an object implementing toString() method!');
          return;
        }
      }

      var parts = [];
      var pattern = /{{\s*(\w+)(?:\s*(?:'|")([^'"]*)(?:'|"))?\s*}}/;

      var result = undefined;
      var text = message;
      while (result = pattern.exec(text)) {
        var split = text.split(result[0]);

        // 1) normal text
        parts.push({
          isPlaceholder: false,
          text: split[0]
        });

        // 2) placeholder
        parts.push({
          isPlaceholder: true,
          name: result[1],
          text: result[2]
        });

        // set remainder
        text = split[1];
      }

      // add last part if any
      if (!isEmpty(text)) {
        parts.push({
          isPlaceholder: false,
          text: text
        });
      }

      // provide parts for template
      this.set('messageParts', parts);
    }

  });
});
/**
 * jQuery Message Handler
 * https://github.com/garagesocial/message-handler-js
 *
 * Licensed under the MIT license.
 * Copyright 2013 Garagesocial, Inc.
 */

;(function($) {
  if (!$.GS) {
    $.GS = {};
  }

  $.GS.message_handler = function(el, options) {
    /* To avoid scope issues, use 'base' instead of 'this' */
    /* to reference this class from internal events and functions. */
    var base = this;

    /* Access to jQuery and DOM versions of element */
    base.$el = $(el);
    base.el = el;

    /* Basic Inputs */
    base.message = null;
    base.type = null;

    /* Add a reverse reference to the DOM object */
    base.$el.data('GS.message_handler', base);

    base.init = function() {
      base.options = $.extend({}, $.GS.message_handler.defaultOptions, options);
    };

    /* Set options after initialization */
    base.option = function(key, value) {
      if ($.isPlainObject(key)) {
        this.options = $.extend(true, this.options, key);
      }
    },

    /**
     * Set message
     * @param  {string} options.message     Required. The message to set
     * @param  {string} options.type        Required. The type to set: success, error, warning, info
     * @param  {string} options.timeout     Optional. Time at which point message gets auto cleared
     * @retval {void}
     */
    base.set = function(options) {
      base.message = options.message;
      base.type = options.type;
      base.timeout = options.timeout;

      if (base.message === undefined || base.type === undefined) {
        console.log("you need to set both 'message' and 'type' keys.");
        return;
      }

      /* If the message is not already set, set it as the content of the element */
      if (base.$el.html() != base.message) {
        var clss, height;
        clss = base.type !== 'warning' ? ' gs-message-' + base.type : '';
        base.$el.html('<div class="gs-message' + clss + '" style="height:0px;"><div>' + base.message + '</div></div>');
        height = base.$el.find('.gs-message > div').outerHeight();
        base.$el.find('.gs-message').animate({
          height: height
        }, 200);
      }

      /* If a timeout was specified, automatically clear the error on expiration */
      if (base.timeout !== undefined) {
        setTimeout(function() {
          base.clear();
        }, base.timeout);
      }
    },

    /**
     * Clear message
     * Sets the message and type to null and DOM element to empty string
     */
    base.clear = function() {
      var properties = {
        height: 0
      };
      base.$el.find('.gs-message').animate(properties, 200, 'swing', function() {
        base.message = null;
        base.type = null;
        base.$el.html("");
      });
    };

    /**
     * Get message status
     * Returns the type of the current message
     */
    base.status = function() {
      return base.type;
    };

    /**
     * Destroy plugin
     */
    base.destroy = function() {
      base.$el.removeData('message_handler');
      base.$el.removeData('GS.message_handler');
    };

    /* Run initializer */
    base.init();
  };

  $.GS.message_handler.defaultOptions = {};

  $.fn.gs_message_handler = function(options) {
    var returnVal = null;

    if (typeof options === 'string') {
      var args = Array.prototype.slice.call(arguments, 1);
      this.each(function() {
        var instance = $.data(this, 'message_handler');

        if (!instance) {
          console.log("cannot call methods on message_handler prior to initialization; " +
            "attempted to call method '" + options + "'");
          return;
        }

        if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
          console.log("no such method '" + options + "' for message_handler instance");
          return;
        }

        // apply method
        returnVal = instance[options].apply(instance, args);
      });
    } else {

      this.each(function() {
        var instance = $.data(this, 'message_handler');
        if (instance) {
          // apply options & init
          instance.option(options || {});
          instance.init();
        } else {
          // initialize new instance
          $.data(this, 'message_handler', new $.GS.message_handler(this, options));
        }

      });
    }
    return returnVal;
  };

  /* This function breaks the chain, but returns */
  /* the GS.message_handler if it has been attached to the object. */
  $.fn.getGS_message_handler = function() {
    this.data('GS.message_handler');
  };

})(jQuery);

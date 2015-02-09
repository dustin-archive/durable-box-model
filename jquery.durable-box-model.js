// Durable Box Model - 1.0.0
// February 6, 2015
// The MIT License (MIT)
// Copyright (c) 2015 Dustin Dowell
// http://github.com/dustindowell22/durable-box-model


(function($) {
  $.fn.dbm = function(options) {

    // Settings
    var settings = $.extend({
      properties : [
        'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
        'padding-top', 'padding-right', 'padding-bottom', 'padding-left'
      ]
    }, options);

    // Store object
    var $this  = $(this);

    // Create style element
    var $style = $('<style>');

    // Selector options
    var idName    = $this.prop('idName'),
        className = $this.prop('className'),
        tagName   = $this.prop('tagName');

    // Use least specific selector possible
    idName    = idName                       ? '#' + idName    : '';
    className = idName    === '' ? className ? '.' + className : '' : '';
    tagName   = className === '' ? tagName   ?       tagName   : '' : '';

    // Selector
    var selectorName = tagName + className + idName;

    // Rounds values to nearest whole number and injects CSS
    function dbm() {

      // Set array scope
      var styles = [];

      // Body font size
      var fontSize = parseFloat($('body').css('font-size'));

      // Clear styles before they're checked for updating
      $style.empty();

      // Loop through properties
      $.each(settings.properties, function(i) {

        // Get value of each property and round to nearest whole number
        var value = (Math.round(parseFloat($this.css(settings.properties[i]))) / fontSize) + 'em';

        // Concatenate properties and values
        styles = styles + '  ' + settings.properties[i] + ': ' + value + ';\n';
      });

      // Add selector and curly braces to styles
      var css = selectorName + ' {\n' + styles  +'}';

      // If <style> has CSS remove it and append new CSS, otherwise append new CSS to <body>
      return $style.text() ? $style.empty().append(css) : $style.append(css).appendTo('body');
    }

    // Execute during runtime
    dbm();

    // Execute on resize
    $(window).on('resize orientationchange', dbm);
  };
})(jQuery);

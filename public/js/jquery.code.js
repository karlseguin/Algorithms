(function($) 
{
  var defaults = {};
  $.fn.code = function(options) 
  {
    if (options.command == 'highlight')
    {
      return this.each(function(){this.code.highlight(options.line)});
    }
    return this.each(function() 
    {
      if (this.code) { return false; }
      var $code = $(this);
      var keywords = /(function|var|null|new|this)/g
      var controls = /(for|if|else|while|return|do)/g
      var $lines = null;
      var self = 
      {   
        initialize: function()
        {
          self.setupCode();
          $lines = $code.find('span.line');
        },
        setupCode: function()
        {
          var lines = $code.html().split('\n');
          for(var i = 0; i < lines.length; ++i)
          {
            lines[i] = self.colorize(lines[i]);
          }
          $code.html(lines.join('\n'));
        },
        colorize: function(line)
        {
          return line.replace(/('.*?')/, '<span class="string">$1</span>').replace(/(\/\/.*)/, '<span class="comment">$1</span>').replace(keywords, '<span class="keyword">$1</span>').replace(controls, '<span class="control">$1</span>');
        },
        highlight: function(line)
        {
          $lines.removeClass('highlight');
          if (line != -1)
          {
            $lines.eq(line).addClass('highlight');
          }
        }
      };
      this.code = self;
      self.initialize();
    });
  };
})(jQuery);
(function($) 
{
  var defaults = {};
  $.fn.example = function(options) 
  {        
    var opts = $.extend({}, defaults, options);
    return this.each(function() 
    {
      if (this.example) { return false; }
      
      var instructions = options.instructions;
      var $container = $(this);
      var $code = options.code;
      var $nodes = $container.find('div.nodeList div');
      var $topNodes, $bottomNodes = null;
      var step = -1;
      
      var self = 
      {   
        initialize: function()
        {
          $container.addClass('example');
          var $top = $('<div class="top">').prependTo($container);
          var $bottom = $('<div class="bottom">').appendTo($container);
          for(var i = 0; i < $nodes.length; ++i)
          {
            var t = $('<div>');
            var b = $('<div class="r">');
            if ($nodes.eq(i).is('.used'))
            {
              t.addClass('wide');
              b.addClass('wide');
            }
            $top.append(t);
            $bottom.append(b);
          }
          $topNodes = $top.children();
          $bottomNodes = $bottom.children();
          $container.find('div.step').click(self.nextStep).mousedown(function(){return false;});
          
          if (options.hideAllOnStart){self.hideAll();}
          if (options.init){self.execute(options.init);}
          if (options.onInit) { options.onInit($container);}
        },
        nextStep: function()
        {
          self.clear();
          if (++step > instructions.length-1)
          {
            $container.find('.reference').remove();
            $topNodes.text(''); //remove stickies too
            if (options.hideAllOnEnd) { self.hideAll(); }
            if (options.onInit) { options.onInit($container);}
            if (options.init){self.execute(options.init);}
            step = -1;
          }
          else
          {
            self.execute(instructions[step]);
          }
          return false;
        },
        hideAll: function()
        {
          $nodes.text('').hide();
        },
        execute: function(instruction)
        {
          $code.code({command: 'highlight', line: instruction.line});
          if (instruction.variables) { self.showVariables(instruction.variables);}
          if (instruction.nodes) { self.highlightNodes(instruction.nodes);}
          if (instruction.comparison) 
          { 
            if (!$.isArray(instruction.comparison)) { instruction.comparison = [instruction.comparison]; }
            self.showComparison(instruction.comparison);
          }
          if (instruction.showReturn) { self.showReturn(instruction.showReturn);}
          if (instruction.show){ self.show(instruction.show);}
          if (instruction.set){ self.set(instruction.set);}
          if (instruction.references) { self.showReferences(instruction.references);}
          if (instruction.refremove) { self.removeReferences(instruction.refremove);}
          if (instruction.showList) { self.showList(instruction.showList);}
        },
        clear: function()
        {
          $topNodes.filter(':not(.sticky)').text('');
          $code.code({command: 'highlight', line: -1});
          $bottomNodes.removeClass('good bad').text('');
          $nodes.removeClass('highlight');
        },
        showVariables: function(variables)
        {
          for(var i = 0; i < variables.length; ++i)
          {
            var variable = variables[i];
            var $node = $topNodes.eq(variable.index);
            var text = variable.name;
            if (variable.value != null) { text += ' = ' + variable.value; }
            if (variable.sticky) { $node.addClass('sticky')} else { $node.removeClass('sticky');}
            $node.text(text);
          }
        },
        showComparison: function(comparisons)
        {
          for(var i = 0; i < comparisons.length; ++i)
          {
            var comparison = comparisons[i];
            var $node = $bottomNodes.eq(comparison.index);
            $node.text(comparison.value).addClass(comparison.result ? 'good' : 'bad')
          }
        },
        showReturn: function(r)
        {
          $bottomNodes.eq(r.index).text('return ' + r.value);
        },
        show: function(show)
        {
          for(var i = 0; i < show.length; ++i)
          {
            $nodes.eq(show[i]).show();
          }
        },
        set: function(set)
        {
          for(s in set)
          {
            $nodes.eq(s).text(set[s]);
          }
        },
        showReferences: function(references)
        {
          for(var i = 0; i < references.length; ++i)
          {
            var reference = references[i];
            var length = 0;
            for(var j = reference.from; j < reference.to; ++j)
            {
              length += self.getWidth($nodes.eq(j));
            }
            var $div = $('<div>').addClass('reference reference_' + length).css('left', reference.left)
            $container.append($div);
          }
        },
        showList: function(lists)
        {
          for(var i = 0; i < lists.length; ++i)
          {
            $container.find('div.nodeList').eq(lists[i]).show();
          }
        },
        removeReferences: function(references)
        {
          var $references = $container.find('.reference');
          for(var i = 0; i < references.length; ++i)
          {
            $references.eq(references[i]).remove();
          }
        },
        getWidth: function($node)
        {
          return $node.is('.used') ? 150 : 50;
        },
        highlightNodes: function(nodes)
        {
          for(var i = 0; i < nodes.length; ++i)
          {
            $nodes.eq(nodes[i]).addClass('highlight');
          }
        }
      };
      this.example = self;
      self.initialize();
    });
  };
})(jQuery);
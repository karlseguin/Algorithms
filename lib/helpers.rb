require 'sinatra/base'
require 'lib/compressor'

module Sinatra
  module AssetHelper
    def css(name)
      files = ENV['RACK_ENV'] == 'development' ? Compressor.get_css(name) : [name]
      tags = ''
      files.each{|file| tags += tag('link', {:rel => 'stylesheet', :type => 'text/css', :href => "/css/#{file}.css"}) }
      tags
    end
  
    def js(name)
      files = ENV['RACK_ENV'] == 'development' ? Compressor.get_js(name) : [name]
      tags = ''
      files.each{|file| tags += tag('script', {:type => 'text/javascript', :src => "/js/#{file}.js"}) }
      tags
    end
    
    #https://gist.github.com/119874
    def partial(template, *args)
     template_array = template.to_s.split('/')
     template = template_array[0..-2].join('/') + "/_#{template_array[-1]}"
     options = args.last.is_a?(Hash) ? args.pop : {}
     options.merge!(:layout => false)
     if collection = options.delete(:collection) then
       collection.inject([]) do |buffer, member|
         buffer << erb(:"#{template}", options.merge(:layout =>
         false, :locals => {template_array[-1].to_sym => member}))
       end.join("\n")
     else
       erb(:"#{template}", options)
     end
    end
    
    private
    def tag(name, options)
      "<#{name} #{tag_options(options)}></#{name}>"
    end
    def tag_options(options)
      attrs = []
      attrs = options.map { |key, value| %(#{key}="#{Rack::Utils.escape_html(value)}") }
      " #{attrs.sort * ' '}"
    end
  end

  helpers AssetHelper
end
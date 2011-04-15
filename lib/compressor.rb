require 'yaml'
class Compressor
  @@settings = YAML::load_file('lib/assets.yml') 
  def self.get_js(name)
    @@settings['js'][name]
  end
  def self.get_css(name)
    @@settings['css'][name]
  end
end

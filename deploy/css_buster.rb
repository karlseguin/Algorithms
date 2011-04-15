require 'zlib'

class CssBuster  
  @@styleSheets = ['all']
  
  def initialize(root)
    @cssPath = root + '/css/'
    @imagePath = root + '/images/'
  end
  
  def crc(fileName)
    fileName = @imagePath + fileName.slice(10..-1)
    contents = File.read(fileName) ; nil
    Zlib.crc32(contents,0).to_s(16)
  end

  def execute
    @@styleSheets.each do |css|
      fileName = @cssPath + css + '.css'
      file = File.new(fileName, 'r')
      lines = []
      while line = file.gets
        line.gsub! /\.\.\/images\/.*?\.(gif|jpg|png)(\?[a-z\d]+)?/ do |match|
          queryIndex = match.index("?")
          match = match.slice(0..queryIndex-1) unless queryIndex.nil?
          match + "?" + crc(match)
        end
        lines << line
      end
      file.close
 
      file = File.new(fileName, File::WRONLY|File::TRUNC)
      lines.each {|line| file.puts line }
      file.close
    end
  end
end

CssBuster.new(ARGV[0]).execute
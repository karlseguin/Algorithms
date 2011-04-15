require 'rubygems'
require 'sinatra'
require 'app'

set :environment, :development

run Sinatra::Application
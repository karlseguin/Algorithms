require 'rubygems'
require 'sinatra'
require 'lib/helpers'
require 'lib/content_for'

get '/' do
  erb :index
end

get '/search/linear' do
  erb :'search/linear'
end

get '/structures/arrays' do
  erb :'structures/arrays'
end

get '/structures/linkedlists' do
  erb :'structures/linkedlists'
end

get '/structures/hashtables' do
  erb :'structures/hashtables'
end

get '/search/binarysearch' do
  erb :'search/binarysearch'
end

get '/sort/bubblesort' do
  erb :'sort/bubblesort'
end

get '/sort/insertionsort' do
  erb :'sort/insertionsort'
end

# get '/sort/quicksort' do
#   erb :'sort/quicksort'
# end
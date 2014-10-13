post '/list/new' do

  if List.exists?(title: params[:list_title])
    return "Your Idea Machine was already submitted!"
  else
    @new_list = List.create(title: params[:list_title])
    @queue = @new_list.id - todays_list.id
    return "Your suggestion will be the Idea Machine in #{@queue} days!"
  end

end

get '/list/:id/all' do
  if session[:privacy_error]
    @error = session[:privacy_error]
    session[:privacy_error] = ""
  end

  @all_idea_machines = IdeaMachine.where(list_id: params[:id], public?: true)

  erb :'idea_machines/todays_public'

end
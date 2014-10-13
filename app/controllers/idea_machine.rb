before '/user/:id/list/:list_id' do
  @user = User.find(params[:id])
end

get '/user/:id/list/:list_id' do
  if IdeaMachine.exists?(user_id: params[:id], list_id: params[:list_id])
    session[:list_error] = "You already completed today's Idea Machine!"
    redirect to ("/user/#{@user.id}/list/#{params[:list_id]}/completed")
  else
    @list = List.find(params[:list_id])
  end

  erb :'/idea_machines/idea_machine'
end

post '/user/:id/list/:list_id' do
  @idea_machine = IdeaMachine.create(user_id: params[:id], list_id: params[:list_id])

  @ideas = params[:ideas]

  @ideas.each {|idea| @user.idea_machines.find(@idea_machine).ideas << Idea.create(idea: idea)}

  @user.idea_machines.find(@idea_machine).update(public?: params[:is_public])

  return @user.id.to_json
end

get '/user/:id/list/:list_id/completed' do
  if session[:list_error]
    @error = session[:list_error]
    session[:list_error] = ""
  end

  @users_idea_machine = User.find(params[:id]).idea_machines.find_by(list_id: params[:list_id])

  if @users_idea_machine.public? == false
    session[:privacy_error] = "Sorry, this PARTICULAR Idea Machine is private."
    redirect to ('/list/:id')
  end

  @ideas = IdeaMachine.find_by(user_id: params[:id], list_id: params[:list_id]).ideas
  erb :'idea_machines/todays_completed'
end

get '/user/:id/idea_machine/all' do
  @idea_machines = current_user.idea_machines

  erb :'idea_machines/all'
end

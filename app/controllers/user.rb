before '/user/:id' do
  @authenticate = authenticate(User.find(params[:id]))
  @user = User.find(params[:id]) if @authenticate
end

get '/user/:id' do
  if !@authenticate
    redirect ('/user/#(session[:user_id])')
  end

  @greetings = ["Hope you have some good ideas today, #{@user.name}!", "What are your ideas today, #{@user.name}?", "#{@user.name}, ready to ideate?", "The World Welcomes Your Ideas, #{@user.name}!", "Welcome to Idea Machine, #{@user.name}!"]

  if IdeaMachine.exists?(list_id: todays_list.id, user_id: current_user.id)
    @completed_today = true
  else
    @completed_today = false
  end

  erb :'users/show'
end





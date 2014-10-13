get '/' do
  @error = session[:login_error] if session[:login_error]
  session[:login_error] = ""
  erb :'index'
end

post '/' do
  if User.exists?(name: params[:name])
    @user = User.find_by(name: params[:name])
    if @user.authenticate(params[:password])
      session[:user_id] = @user.id
      redirect to ("/user/#{@user.id}")
    else
      session[:login_error] = "Username/Password are Invalid."

      redirect to '/'
    end
  else
    session[:login_error] = "Username/Password are Invalid."
    redirect to '/'
  end
end

get '/signup' do
  @error = session[:signup_error] if session[:signup_error]
  session[:signup_error] = ""

  erb :'signup'
end

post '/signup' do
  if User.exists?(name: params[:name])
    session[:signup_error] = "Username already exists."
    redirect to ("/signup")
  else
    if params[:password] != params[:confirm_password]
      session[:signup_error] = "Password does not match."
      redirect to ("/signup")
    else
      @user = User.create(name: params[:name], password: params[:password])
      session[:user_id] = @user.id
      redirect to ("/user/#{@user.id}")
    end
  end
end

get '/logout' do
  session.clear
  redirect to ('/')
end
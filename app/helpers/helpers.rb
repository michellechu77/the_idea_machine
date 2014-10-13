helpers do
  def current_user
    if session[:user_id]
      @current_user ||= User.find(session[:user_id])
    end
  end

  def logged_in?
    !@current_user.nil?
  end

  def authenticate(user)
    current_user = user
  end

  def todays_list()
    active_list = List.find_by(active?: true)
    if active_list.made_active.getlocal + 1.day > Time.now.getlocal
      List.find(active_list.id + 1).update(active?: true)
      List.find(active_list.id + 1).update(made_active: active_list.made_active + 1)
      active_list.update(active?: false)
      active_list = List.find_by(active?: true)
    end
    active_list
  end
end
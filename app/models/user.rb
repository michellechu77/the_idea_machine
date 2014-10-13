class User < ActiveRecord::Base
  has_secure_password

  has_many :idea_machines
  has_many :lists, through: :idea_machines
  has_many :ideas, through: :idea_machines

end

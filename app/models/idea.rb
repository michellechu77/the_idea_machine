class Idea < ActiveRecord::Base
  belongs_to :idea_machine
  belongs_to :user
  belongs_to :list

end

class IdeaMachine < ActiveRecord::Base
  belongs_to :user, counter_cache: :list_count
  belongs_to :list, counter_cache: :user_count
  has_many :ideas
end

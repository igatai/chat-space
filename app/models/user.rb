class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  def self.search(input, id)
    # binding.pry
    return nil if input == ""
    # モデル.where('カラム名 LIKE(?)',"%{:keyword}%")... :keywordを含み、自分自身を除くユーザー10件
    User.where('name LIKE ?', "%#{input}%" ).where.not(id: id).limit(10)
  end
  
  has_many :group_users
  has_many :groups, through: :group_users
  has_many :messages
end
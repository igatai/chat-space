class UsersController < ApplicationController

  def index
    # binding.pry

    return nil if params[:keyword] == ""
    # モデル.where('カラム名 LIKE(?)',"%{:keyword}%")... :keywordを含み、自分自身を除くユーザー10件
    # @users = User.where('text LIKE(?)',"%{params[:keyword]}%").where.not(id: current_user.id).limit(10)
    # @users = User.search(params[:keyword], current_user.id)

    @users = User.search(params[:keyword], current_user.id)
    # binding.pry
    # API生成
    respond_to do |format|
      format.html
      format.json
    end
  end

  def edit

  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  def search
    # binding.pry
    @users = User.search(params[:keyword])
    respond_to do |format|
      format.json
      format.html
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end

  def group_params
    params.require(:group).permit(:id)
  end
end

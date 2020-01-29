class UsersController < ApplicationController

  def index
    respond_to do |format|
      # API生成
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

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end

  def group_params
    params.require(:group).permit(:id)
  end
end

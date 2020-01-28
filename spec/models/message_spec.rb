require 'rails_helper'

describe Message do
  describe '#create' do

    ### メッセージを保存できる場合
    context 'can save' do

      # メッセージがあれば保存できる
      it "is valid with a message" do
        user = build(:user)
        group = build(:group)
        #group_user = build(:group_user)
        message = build(:message, image:nil)
        message.valid?
        expect(message).to be_valid
      end

      # 画像があれば保存できる
      it "is valid with a image" do
        user = build(:user)
        group = build(:group)
        #group_user = build(:group_user)
        message = build(:message, content:nil)
        message.valid?
        expect(message).to be_valid
      end

      # メッセージと画像があれば保存できる
      it "is valid with a content and an image" do
        user = build(:user)
        group = build(:group)
        #group_user = build(:group_user)
        message = build(:message)
        message.valid?
        expect(message).to be_valid
      end
    end

    ### メッセージを保存できない場合
    context 'can not save' do

      # メッセージも画像も無いと保存できない
      it "is invalid without content and image" do
        user = build(:user)
        group = build(:group)
        #group_user = build(:group_user)
        message = build(:message, content: nil, image: nil)
        message.valid?
        expect(message.errors[:content]).to include("を入力してください")
      end

      # group_idが無いと保存できない
      it "is invalid without group_id" do
        user = build(:user)
        group = build(:group)
        #group_user = build(:group_user)
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include("を入力してください")
      end

      # user_idが無いと保存できない

      it "is invalid without user_id" do
        user = build(:user)
        group = build(:group)
        #group_user = build(:group_user)
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include("を入力してください")
      end
    end
  end
end



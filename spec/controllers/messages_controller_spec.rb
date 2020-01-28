require 'rails_helper'

describe MessagesController do
  #インスタンスを生成
  let(:group) { create(:group) }
  let(:user) { create(:user) }

  ##メッセージ一覧ページを表示するアクション
  describe '#index' do
    ### ログインしている場合
    context 'login' do
      #各exampleが実行される直前に毎回実行される共通処理
      before do
        #ログイン処理を実行
        login user
        #擬似的にindexアクションを動かす処理
        #messagesのルーティングがgroupにネストされているため、getメソッドの引数としてgroup_idを渡す
        get :index, params: { group_id: group.id }
      end

      # アクション内で定義しているインスタンス変数があるか
      it 'assigns @message' do
        #@messageを参照したい場合、assigns(:message)を指定
        #be_a_newマッチャで、Messageクラスのインスタンスかつ未保存であることを確認
        expect(assigns(:message)).to be_a_new(Message)
      end
      it 'assigns @group' do
        #eqマッチャにて、assigns(:group)とgroupが同一か確認
        expect(assigns(:group)).to eq group
      end

    # 該当するビューが描画されているか    
      it 'renders index' do
        #response:example内でリクエストが行われた後の遷移先のビューの情報を持つ
        #render_templateマッチャ：引数にとったアクションがリクエストされたときに自動的に遷移するビューを返す
        expect(response).to render_template :index
      end
    end
    ### ログインしていない場合
    context 'not logedined yet' do
      before do
        get :index, params: { group_id: group.id }
      end

    # 意図したビューにリダイレクトできているか
      it 'redirects to new_user_session_path' do
        #redirect_toマッチャ；引数にとったプレフィクスにリダイレクトした際の情報を返す
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end

  ##メッセージを作成するアクション
  describe '#create' do
    #擬似的にアクションをリクエストする際に、引数として渡すため
    #attributes_for；Factory_botによって定義されるメソッド。オブジェクトを生成せずにハッシュを生成する。
    let(:params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message) } }
    # ログインしているかつ、保存に成功した場合
    context 'login' do
      before do
        #ログイン処理を実行
        login user
      end

      context 'can save' do
        #expect内引数の定義をsubjectに切り出し
        subject {
          post :create,
          params: params
        }

        #メッセージの保存はできたのか
        it 'count up message' do
          #postメソッドでcreateアクションを擬似的にリクエストした結果。。。
          #changeマッチャ：引数が変化したかどうか確認(Messageモデルのレコードが１カウント増えたかどうか)
          expect{ subject }.to change(Message, :count).by(1)
        end

        #意図した画面に遷移しているか
        it 'redirects to group_message_path' do
          subject
          #redirect_toマッチャ；引数にとったプレフィクスにリダイレクトした際の情報を返す
          #group_messages GET    /groups/:group_id/messages(.:format) messages#index
          expect(response).to redirect_to(group_messages_path(group))
        end
      end

      # ログインしているが、保存に失敗した場合
      context 'can not save' do
        #attributes_forで(content: nil,image: nil)となるinvalid_paramsを定義して引数で渡す
        let(:invalid_params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message, content: nil, image: nil ) } }

        subject {
          post :create,
          params: invalid_params
        }

        # メッセージの保存は行われなかったか
        it 'does not count up' do
          # Messageモデルのレコード数が変化しないこと
          expect{ subject }.not_to change(Message, :count)
        end

        # 意図したビューが描画されているか
        it 'renders index' do
          subject
          #意図したビューが描画されているかどうか
          expect(response).to render_template :index
        end
      end
    end

    # ログインしていない場合
    context 'not login' do
      # 意図したビューにリダイレクトできているか
      it 'redirects to new_user_session_path' do
        post :create, params: params
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end
require 'rails_helper'

describe MessagesController do
  let(:group) { create(:group) }
  let(:user) { create(:user) }

  describe '#index' do

    context 'log in' do
      before do
        login user
        get :index, params: { group_id: group.id }
      end

      it 'assigns @message' do
        expect(assigns(:message)).to be_a_new(Message)
      end

      it 'assigns @group' do
        expect(assigns(:group)).to eq group
      end

      it 'renders index' do
        expect(response).to render_template :index
      end
    end

    context 'not log in' do
      before do
        get :index, params: { group_id: group.id }
      end

      it 'redirects to new_user_session_path' do
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end

  
  describe '#create' do
    let(:params) { {group_id: group.id, user_id: user.id, message: attributes_for(:message) } }

    context 'ログインしてる' do
      before do
        login user
      end

      context '保存に成功した' do
        subject {
          post :create,
          params: params
        }
        it 'messageレコードが追加された' do
          expect{ subject }.to change(Message, :count).by(1)
        end
        it '意図した遷移ができているか' do
          subject
          expect(response).to redirect_to(group_messages_path(group))
        end
      end

      context '保存に失敗した' do
        let(:invalid_params) { {group_id: group.id, user_id: user.id, message: attributes_for(:message, content: nil, image: nil) } }
        subject {
          post :create,
          params: invalid_params
        }
        it '保存できない' do
          expect { subject }.not_to change(Message, :count)
        end
        it '意図したビューが描画されているか' do
          subject
          expect(response).to render_template :index
        end
      end
    end

    context 'ログインしていない' do
      it 'redirects to new_user_session_path' do
      post :create,
      params: params
      expect(response).to redirect_to(new_user_session_path)
      end
    end
  end


end
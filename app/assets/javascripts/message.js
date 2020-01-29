$(function(){
  function buildHTML(message){
    if (message.image) {
      var html = `<div class="chat_main__lists__message message-id=${message.id}">
                    <div class="chat_main__lists__message__info">
                      <div class="chat_main__lists__message__info_user_name">
                        ${message.user_name}
                      </div>
                      <div class="chat_main__lists__message__info_date">
                        ${message.date}
                      </div>
                    </div>
                    <div class="chat_main__lists__message__content">
                      ${message.content}
                      <div>
                        <img src=${message.image} >
                      </div>
                    </div>
                  </div>`
      return html;
    } else {
      var html = `<div class="chat_main__lists__message message-id=${message.id}">
                    <div class="chat_main__lists__message__info">
                      <div class="chat_main__lists__message__info_user_name">
                        ${message.user_name}
                      </div>
                      <div class="chat_main__lists__message__info_date">
                        ${message.date}
                      </div>
                    </div>
                    <div class="chat_main__lists__message__content">
                      ${message.content}
                    </div>
                  </div>`
    }
    return html
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this); //フォームのデータを取得
    var url = $(this).attr('action') // $(this):onメソッドを利用しているノードのオブジェクトを参照
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData:  false,  // dataに指定した値をクエリ文字にするかどうか
      contentType:  false   //コンテンツタイプ（text/xml）をxmlとしてサーバに伝達
    })
    .done(function(data){
      var html = buildHTML(data);
      //子要素の一番最後に追加する
      $(".chat_main__lists").append(html);

      // $(".chat_main__form")[0].reset();
      // scrollTop: 指定した分だけスクロールする。メッセージが入ったdiv要素のスクロール可能な高さ
      $('.chat_main__lists').animate({ scrollTop : $('.chat_main__lists')[0].scrollHeight });
      // //フォームを空にする
      $('#new_message')[0].reset()//form全体のidを指定
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
    });
    return false;
  })
});
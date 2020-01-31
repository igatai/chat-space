$(function(){

  function buildHTML(message){
    console.log(message);
    if (message.content && message.image) {
      var html = `<div class="chat_main__lists__message" data-message-id="${message.id}">
                    <div class="chat_main__lists__message__info">
                      <div class="chat_main__lists__message__info__user_name">
                        ${message.user_name}
                      </div>
                      <div class="chat_main__lists__message__info__date">
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
    } else if (message.content) {
      var html = `<div class="chat_main__lists__message" data-message-id="${message.id}">
                    <div class="chat_main__lists__message__info">
                      <div class="chat_main__lists__message__info__user_name">
                        ${message.user_name}
                      </div>
                      <div class="chat_main__lists__message__info__date">
                        ${message.date}
                      </div>
                    </div>
                    <div class="chat_main__lists__message__content">
                      ${message.content}
                    </div>
                  </div>`
      return html;
    } else if (message.image) {
      var html = `<div class="chat_main__lists__message" data-message-id="${message.id}">
                    <div class="chat_main__lists__message__info">
                      <div class="chat_main__lists__message__info__user_name">
                        ${message.user_name}
                      </div>
                      <div class="chat_main__lists__message__info__date">
                        ${message.date}
                      </div>
                    </div>
                    <div class="chat_main__lists__message__content">
                      ${message.image}
                    </div>
                  </div>`
      return html;
    }
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
      // scrollTop: 指定した分だけスクロールする。メッセージが入ったdiv要素のスクロール可能な高さ
      $('.chat_main__lists').animate({ scrollTop : $('.chat_main__lists')[0].scrollHeight });
      // フォームを空にする
      $('#new_message')[0].reset()//form全体のidを指定
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
    });
    return false;
  })

  var reloadMessages = function() {
    // メッセージの最後のhtmlのmessage-idからidを拾って、last_message_idにいれる
    last_message_id = $('.chat_main__lists__message:last').data("message-id");
    $.ajax({
      // ルーティング設定通り、[/groups/id/]api/messagesとする
      url:  'api/messages',
      // ルーティングで設定したとおり、httpメソッドにgetを指定
      type: 'get',
      dataType: 'json',
      // dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages){
      if (messages.length !== 0){
        var insertHTML = '';// 追加するHTMLを格納する変数
        $.each(messages, function(i, message){
          insertHTML += buildHTML(message)
        });
        $('.chat_main__lists').append(insertHTML);
        $('.chat_main__lists').animate({ scrollTop: $('.chat_main__lists')[0].scrollHeight});
      }
    })
    .fail(function(){
      console.log("error");
    });
  }
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});
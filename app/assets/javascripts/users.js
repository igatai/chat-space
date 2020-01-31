$(function(){

  //検索結果の追加
  function addUser(user){
      var html = `
                  <div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${user.name}</p>
                    <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                  </div>
                  `;
      $("#user-search-result").append(html);
  }

  // エラ〜メッセージの追加
  function addErrMsgToHTML(msg){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${msg}</p>
                </div>
    `;
    $("#user-search-result").append(html);
  }

  function addDeleteUser(name, id){
    console.log("bbb")
    let html = `
    <div class="chat-group-user clearfix" id="${id}">
      <p class="chat-group-user__name">${name}</p>
      <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id="${id}" data-user-name="${name}">削除</div>
    </div>`;
    $(".js-add-user").append(html);
  }

  // メンバーの追加
  function addMember(user_id){
    let html = `<input value="${user_id}" name="group[user_ids][]" type="hidden" id="group_user_ids_${user_id}" />`;
    // let html = `<input value="${attr.user_id}" name="attr.group[user_ids][]" type="hidden" attr.id="group_user_ids_${attr.user_id}" />`;
    // $(`#${user_id}`).append(html);
    $(`#${user_id}`).append(html);
    // console.log("aaaa");
  }

  $("#user-search-field").on("keyup", function() {
    let input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url:  '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      // console.log(users);
      $("#user-search-result").empty();
      if (users.length !== 0 ){
        users.forEach(function(user){
          // console.log(user);
          addUser(user);
        });
      } else if (input.length == 0 ){
        return false;
      } else {
        addErrMsgToHTML("一致するユーザがいません");
      }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    });
  });

  $("#user-search-result").on("click",".chat-group-user__btn--add",function(){
    console.log("AAA");
    const user_id = $(this).attr("data-user-id");
    const user_name = $(this).attr("data-user-name");
    // console.log(user_id);
    // console.log(user_name);
    $(this)
      .parent()
      .remove();
    addDeleteUser(user_name, user_id);
    addMember(user_id);
  });
  $(document).on("click",".chat-group-user__btn--remove", function(){
    $(this)
      .parent()
      .remove();
  });
});

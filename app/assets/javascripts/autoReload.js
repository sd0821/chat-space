$(function(){
  function buildHTML(message) {
    if(message.image) {
    let html = `<div class="message-list" data-message-id=${message.id}>
                  <div class="message-index">
                    <div class="message-name">
                      ${message.user_name}
                    </div>
                    <div class="message-date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="message-text">
                    <div class="Message-content">
                      ${message.content}
                    </div>
                    <img class="Message-image" src="${message.image}">
                  </div>
                </div>`
    return html;
    } else {
    let html = `<div class="message-list" data-message-id=${message.id}>
                  <div class="message-index">
                    <div class="message-name">
                      ${message.user_name}
                    </div>
                    <div class="message-date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="message-text">
                    <div class="Message-content">
                      ${message.content}
                    </div>
                  </div>
                </div>`
    return html;
    }
  }
  let = reloadMessages = function() {
    let last_message_id = $(".message-list:last").data("message-id") || 0;
    $.ajax({
      url: "api/messages",
      type: "get",
      data: {id: last_message_id },
      dataType: 'json'
    })
    .done(function(message) {
      if(message.length != 0){
        let insertHTML = '';
        $.each(message, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $(".Main_chat__message_list").append(insertHTML);
        $(".Main_chat__message_list").animate({ scrollTop: $(".Main_chat__message_list")[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error')
    })
  };
  setInterval(reloadMessages, 7000);
});
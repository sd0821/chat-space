$(function(){
  function buildHTML(message) {
    if(message.image) {
    let html = `<div class="message-list">
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
    let html = `<div class="message-list">
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
  $(".new-message").on('submit', function(e) {
    e.preventDefault()
    let formData = new FormData(this)
    let url = $(this).attr('acton')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      let html = buildHTML(data)
      console.log(data)
      $(".Main_chat__message_list").append(html);
      $(".Main_chat__message_list").animate({
        scrollTop: $(".Main_chat__message_list")[0].scrollHeight
      })
      $(".new-message")[0].reset();
      $(".send-btn").prop('disabled', false);
    })
    .fail(function() {
      alert('メッセージの送信に失敗しました');
    })
  })
});
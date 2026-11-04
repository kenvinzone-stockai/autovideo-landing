// Nút sao chép liên hệ
  document.querySelectorAll('.copybtn').forEach(function(b){
    b.addEventListener('click', function(){
      var el = document.querySelector(b.getAttribute('data-copy'));
      var txt = el ? el.textContent.trim() : '';
      var done = function(){ var o=b.textContent; b.textContent='Đã chép ✓'; setTimeout(function(){b.textContent=o;},1600); };
      if(navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(txt).then(done).catch(function(){ sel(el); done(); });
      } else { sel(el); done(); }
    });
  });
  function sel(el){ try{ var r=document.createRange(); r.selectNodeContents(el); var s=getSelection(); s.removeAllRanges(); s.addRange(r);}catch(e){} }

  // Form: trang tĩnh không gửi đi đâu — soạn sẵn nội dung để khách gửi qua Zalo/Email
  var form = document.getElementById('leadform');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var name=(document.getElementById('f-name').value||'').trim();
    var need=(document.getElementById('f-need').value||'').trim();
    var contact=(document.getElementById('f-contact').value||'').trim();
    if(!need){ document.getElementById('f-need').focus(); return; }
    var phone=(document.getElementById('v-phone').textContent||'').trim();
    var email=(document.getElementById('v-email').textContent||'').trim();
    var msg='Xin chào KenvinZone AutoVideo,\n'
      + 'Tôi là: '+(name||'(chưa điền)')+'\n'
      + 'Tôi muốn làm: '+need+'\n'
      + 'Liên hệ lại tôi qua: '+(contact||'(chưa điền)');
    var box=document.getElementById('formresult');
    box.hidden=false;
    box.innerHTML='<b>Đã sẵn sàng!</b> Hãy gửi nội dung dưới đây cho tôi qua Zalo <b>'+phone+'</b> hoặc Email <b>'+email+'</b> để được tư vấn nhanh nhất:'
      + '<pre id="composed"></pre><button type="button" class="btn primary" id="copymsg" style="margin-top:4px;padding:11px 20px;font-size:.92rem">Sao chép nội dung</button>';
    document.getElementById('composed').textContent=msg;
    document.getElementById('copymsg').addEventListener('click', function(){
      var b=this;
      var done=function(){ b.textContent='Đã chép ✓'; };
      if(navigator.clipboard&&navigator.clipboard.writeText){ navigator.clipboard.writeText(msg).then(done).catch(function(){sel(document.getElementById('composed'));done();}); }
      else { sel(document.getElementById('composed')); done(); }
    });
    box.scrollIntoView({behavior:'smooth',block:'nearest'});
  });

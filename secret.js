// ===========================================
// 隠しコマンド：ロゴ5回タップ or 「ENYU」と入力
// 非公開ページ一覧（管理者ページ）へ移動
// ===========================================
(function () {
  var ADMIN_PAGE = 'sara-admin-9c51f874.html';
  var TAP_LIMIT = 5;
  var TAP_WINDOW_MS = 2500;
  var KEY_SEQUENCE = ['e', 'n', 'y', 'u'];

  function goToAdmin() {
    window.location.href = ADMIN_PAGE;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var logo = document.querySelector('.site-header .logo');

    // --- スマホ／タッチ：ロゴ5回タップ ---
    if (logo) {
      var tapCount = 0;
      var tapTimer = null;

      logo.addEventListener('click', function (e) {
        tapCount++;
        if (tapTimer) clearTimeout(tapTimer);
        tapTimer = setTimeout(function () {
          tapCount = 0;
        }, TAP_WINDOW_MS);

        if (tapCount >= TAP_LIMIT) {
          e.preventDefault(); // 5回目だけリンク遷移を止めて管理者ページへ
          tapCount = 0;
          clearTimeout(tapTimer);
          goToAdmin();
        }
      });

      // ダブルクリックでテキスト選択されるのを防ぐ
      logo.addEventListener('selectstart', function (e) { e.preventDefault(); });
    }

    // --- PC：「ENYU」と順番に入力 ---
    var keyBuffer = [];
    document.addEventListener('keydown', function (e) {
      var key = e.key.toLowerCase();
      keyBuffer.push(key);
      if (keyBuffer.length > KEY_SEQUENCE.length) keyBuffer.shift();

      if (keyBuffer.length === KEY_SEQUENCE.length &&
          keyBuffer.every(function (k, i) { return k === KEY_SEQUENCE[i]; })) {
        keyBuffer = [];
        goToAdmin();
      }
    });
  });
})();

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
        e.preventDefault(); // タップ中は常にページ遷移を止める
        tapCount++;
        if (tapTimer) clearTimeout(tapTimer);

        if (tapCount >= TAP_LIMIT) {
          tapCount = 0;
          goToAdmin();
          return;
        }

        // 一定時間タップが続かなければ、通常のロゴクリックとしてHomeに移動する
        tapTimer = setTimeout(function () {
          var wasSingleTap = (tapCount === 1);
          tapCount = 0;
          if (wasSingleTap) {
            window.location.href = logo.getAttribute('href');
          }
        }, TAP_WINDOW_MS);
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

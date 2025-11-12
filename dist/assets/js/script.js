"use strict";

jQuery(function ($) {
  // この中であればWordpressでも「$」が使用可能になる
  // ===============================
  // Drawer Navigation（全デバイス対応）
  // ===============================
  $(function () {
    var $hamburger = $('.js-hamburger');
    var $drawer = $('.js-drawer');

    // ハンバーガークリックで開閉
    $hamburger.on('click', function () {
      $(this).toggleClass('is-active'); // ハンバーガーのアニメーション
      $drawer.toggleClass('is-active'); // ナビの表示切替
      $('body').toggleClass('is-fixed'); // 背景スクロール固定
    });

    // ナビ内リンククリックで閉じる
    $('.header-nav__item a').on('click', function () {
      $hamburger.removeClass('is-active');
      $drawer.removeClass('is-active');
      $('body').removeClass('is-fixed');
    });
  });
});
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

  /* --------------------------------------------
  /* TOPページ 商品スライド
  /* -------------------------------------------- */

  var productsSwiper = new Swiper('.top-products__slider', {
    loop: true,
    // ▼ SP（375px）で 3枚表示
    slidesPerView: 1.35,
    centeredSlides: true,
    // ← 真ん中を基準にする
    spaceBetween: 23,
    // ← カンプのgap指定

    navigation: {
      nextEl: '.top-products__next',
      prevEl: '.top-products__prev'
    },
    breakpoints: {
      // ▼ PC（768px〜）
      768: {
        slidesPerView: 3,
        // PCは 3 枚 FULL 表示
        centeredSlides: false,
        spaceBetween: 32
      }
    }
  });

  // ニュース詳細：Recommend
  var recommendSlider = new Swiper('.recommend-products__slider', {
    slidesPerView: 2,
    spaceBetween: 16,
    navigation: {
      nextEl: '.recommend-products__next',
      prevEl: '.recommend-products__prev'
    },
    pagination: {
      el: '.recommend-products__pagination',
      clickable: true
    }
  });

  // ニュース詳細：New Post
  var newPostSlider = new Swiper('.new-post__slider', {
    slidesPerView: 1.2,
    spaceBetween: 20,
    navigation: {
      nextEl: '.new-post__next',
      prevEl: '.new-post__prev'
    },
    pagination: {
      el: '.new-post__pagination',
      clickable: true
    }
  });
});
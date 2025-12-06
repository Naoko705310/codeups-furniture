
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる
  // ===============================
  // Drawer Navigation（全デバイス対応）
  // ===============================
  $(function () {
    const $hamburger = $('.js-hamburger');
    const $drawer = $('.js-drawer');

    // ハンバーガークリックで開閉
    $hamburger.on('click', function () {
      $(this).toggleClass('is-active');   // ハンバーガーのアニメーション
      $drawer.toggleClass('is-active');   // ナビの表示切替
      $('body').toggleClass('is-fixed');  // 背景スクロール固定
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

  const productsSwiper = new Swiper('.top-products__slider', {
    loop: true,
  
    // ▼ SP（375px）で 3枚表示
    slidesPerView: 1.35,
    centeredSlides: true,  // ← 真ん中を基準にする
    spaceBetween: 23,      // ← カンプのgap指定
  
    navigation: {
      nextEl: '.top-products__next',
      prevEl: '.top-products__prev'
    },
  
    breakpoints: {
      // ▼ PC（768px〜）
      768: {
        slidesPerView: 3,   // PCは 3 枚 FULL 表示
        centeredSlides: false,
        spaceBetween: 32,
      }
    }
  });
  
  // ニュース詳細：Recommend
  const recommendSlider = new Swiper('.recommend-products__slider', {
    loop: true,
    slidesPerView: 1.25,
    centeredSlides: true,
    spaceBetween: 24,
  
    navigation: {
      // ★ ここを逆にする！
      nextEl: '.recommend-products__prev', // ← ボタンで右へ進む
      prevEl: '.recommend-products__next', // → ボタンで左へ戻る
    },
  
    pagination: {
      el: '.recommend-products__pagination',
      clickable: true,
    },
  
    breakpoints: {
      768: {
        slidesPerView: 3,
        centeredSlides: false,
        spaceBetween: 24,
      }
    }
  });
  


  // ニュース詳細：New Post
  const newPostSlider = new Swiper('.new-post__slider', {
    loop: true,
    slidesPerView: 1.25,
    spaceBetween: 30,
  
    navigation: {
      // ★ ここも逆にする！
      nextEl: '.new-post__prev', // ← ボタンで右へ進む
      prevEl: '.new-post__next', // → ボタンで左へ戻る
    },
  
    pagination: {
      el: '.new-post__pagination',
      clickable: true,
    },
  });
  
  




});

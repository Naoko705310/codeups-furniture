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
    loop: true,
    loopAdditionalSlides: 2,
    // ループ時に追加で複製するスライド数
    slidesPerView: 1.25,
    centeredSlides: true,
    centeredSlidesBounds: false,
    // 境界を無視して中央配置
    spaceBetween: 24,
    watchSlidesProgress: true,
    // スライドの進行状況を監視
    watchSlidesVisibility: true,
    // スライドの可視性を監視

    navigation: {
      nextEl: '.recommend-products__prev',
      // ← ボタンで右へ進む
      prevEl: '.recommend-products__next' // → ボタンで左へ戻る
    },

    pagination: {
      el: '.recommend-products__pagination',
      clickable: true
    },
    // 初期化後に位置を調整
    on: {
      init: function init() {
        this.update();
      },
      resize: function resize() {
        this.update();
      }
    },
    breakpoints: {
      768: {
        slidesPerView: 3,
        centeredSlides: false,
        spaceBetween: 24
      }
    }
  });

  // ニュース詳細：New Post
  var newPostSlider = new Swiper('.new-post__slider', {
    loop: true,
    slidesPerView: 1.25,
    spaceBetween: 30,
    navigation: {
      // ★ ここも逆にする！
      nextEl: '.new-post__prev',
      // ← ボタンで右へ進む
      prevEl: '.new-post__next' // → ボタンで左へ戻る
    },

    pagination: {
      el: '.new-post__pagination',
      clickable: true
    },
    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: 30
      }
    }
  });

  /* --------------------------------------------
  /* お問い合わせフォーム
  /* -------------------------------------------- */

  $(function () {
    // フォーム本体
    var $form = $(".contact-form__form");

    // フォーム上部のグローバルエラーメッセージ
    var $globalError = $(".contact-form__global-error");

    // テキスト入力・テキストエリア
    var $inputs = $(".contact-form__input, .contact-form__textarea");

    // ラジオボタン
    var $radios = $(".contact-form__radio");

    // チェックボックス
    var $checkboxes = $(".contact-form__checkbox");

    // =========================
    // ✅ 送信ボタンが押されたとき
    // =========================
    $form.on("submit", function (e) {
      var hasError = false; // エラーがあるかどうかの判定用フラグ

      // グローバルエラー表示をリセット
      $globalError.removeClass("is-show").text("");

      // すでに付いている is-error をすべて削除
      $(".is-error").removeClass("is-error");

      // =========================
      // ✅ input / textarea の必須チェック
      // =========================
      $inputs.each(function () {
        if ($(this).prop("required") && $.trim($(this).val()) === "") {
          $(this).addClass("is-error"); // 赤枠を付ける
          hasError = true;
        }
      });

      // =========================
      // ✅ radio の必須チェック（グループ単位）
      // =========================
      var radioNames = [];

      // radio の name を重複なしで収集
      $radios.each(function () {
        var name = $(this).attr("name");
        if (!radioNames.includes(name)) {
          radioNames.push(name);
        }
      });

      // 各グループで1つも選ばれていなければエラー
      $.each(radioNames, function (index, name) {
        if ($("input[name=\"".concat(name, "\"]:checked")).length === 0) {
          $("input[name=\"".concat(name, "\"]")).closest(".contact-form__field").addClass("is-error");
          hasError = true;
        }
      });

      // =========================
      // ✅ checkbox の必須チェック
      // =========================
      $checkboxes.each(function () {
        if ($(this).prop("required") && !$(this).prop("checked")) {
          $(this).closest(".contact-form__field").addClass("is-error");
          hasError = true;
        }
      });

      // =========================
      // ✅ エラーがあった場合は送信を止める
      // =========================
      if (hasError) {
        e.preventDefault(); // フォーム送信をキャンセル

        // グローバルエラーを表示
        $globalError.text("※必須項目が入力されていません。入力してください。").addClass("is-show");

        // エラーメッセージの位置までスクロール
        $("html, body").animate({
          scrollTop: $globalError.offset().top - 40
        }, 400);
      }
    });

    // =========================
    // ✅ 入力したら is-error を解除
    // =========================

    // テキスト入力・テキストエリア
    $inputs.on("input", function () {
      if ($.trim($(this).val()) !== "") {
        $(this).removeClass("is-error");
      }
    });

    // ラジオボタン
    $radios.on("change", function () {
      $(this).closest(".contact-form__field").removeClass("is-error");
    });

    // チェックボックス
    $checkboxes.on("change", function () {
      $(this).closest(".contact-form__field").removeClass("is-error");
    });
  });
});
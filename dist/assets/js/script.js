"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
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
  /* 共通：Products Slider 設定
  /* -------------------------------------------- */

  var baseProductsSliderOptions = {
    loop: true,
    centeredSlides: true,
    centeredSlidesBounds: false,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    navigation: {
      nextEl: '.products-slider__next',
      prevEl: '.products-slider__prev'
    },
    on: {
      init: function init() {
        this.update();
      },
      resize: function resize() {
        this.update();
      }
    }
  };

  /* --------------------------------------------
  /* TOPページ：Products
  /* -------------------------------------------- */

  var topProductsSlider = new Swiper('.top-products__slider.products-slider', _objectSpread(_objectSpread({}, baseProductsSliderOptions), {}, {
    slidesPerView: 1.35,
    spaceBetween: 23,
    breakpoints: {
      768: {
        slidesPerView: 3,
        centeredSlides: false,
        spaceBetween: 32
      }
    }
  }));

  /* --------------------------------------------
  /* News詳細：Recommend
  /* -------------------------------------------- */

  var recommendSlider = new Swiper('.recommend-products__slider.products-slider', _objectSpread(_objectSpread({}, baseProductsSliderOptions), {}, {
    loopAdditionalSlides: 2,
    slidesPerView: 1.25,
    spaceBetween: 24,
    pagination: {
      el: '.recommend-products__pagination',
      clickable: true
    },
    breakpoints: {
      768: {
        slidesPerView: 3,
        centeredSlides: false,
        spaceBetween: 24
      }
    }
  }));

  /* --------------------------------------------
  /* News詳細：New Post
  /* -------------------------------------------- */

  var newPostSlider = new Swiper('.new-post__slider.products-slider', _objectSpread(_objectSpread({}, baseProductsSliderOptions), {}, {
    slidesPerView: 1.25,
    spaceBetween: 30,
    pagination: {
      el: '.new-post__pagination',
      clickable: true
    },
    breakpoints: {
      768: {
        slidesPerView: 3,
        centeredSlides: false,
        spaceBetween: 30
      }
    }
  }));

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

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
/* 共通：Products Slider 設定
/* -------------------------------------------- */

const baseProductsSliderOptions = {
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
    init: function () {
      this.update();
    },
    resize: function () {
      this.update();
    }
  }
};


/* --------------------------------------------
/* TOPページ：Products
/* -------------------------------------------- */

const topProductsSlider = new Swiper(
  '.top-products__slider.products-slider',
  {
    ...baseProductsSliderOptions,

    slidesPerView: 1.35,
    spaceBetween: 23,

    breakpoints: {
      768: {
        slidesPerView: 3,
        centeredSlides: false,
        spaceBetween: 32,
      }
    }
  }
);


/* --------------------------------------------
/* News詳細：Recommend
/* -------------------------------------------- */

const recommendSlider = new Swiper(
  '.recommend-products__slider.products-slider',
  {
    ...baseProductsSliderOptions,

    loopAdditionalSlides: 2,
    slidesPerView: 1.25,
    spaceBetween: 24,

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
  }
);


/* --------------------------------------------
/* News詳細：New Post
/* -------------------------------------------- */

const newPostSlider = new Swiper(
  '.new-post__slider.products-slider',
  {
    ...baseProductsSliderOptions,

    slidesPerView: 1.25,
    spaceBetween: 30,

    pagination: {
      el: '.new-post__pagination',
      clickable: true,
    },

    breakpoints: {
      768: {
        slidesPerView: 3,
        centeredSlides: false,
        spaceBetween: 30,
      }
    }
  }
);



  /* --------------------------------------------
  /* お問い合わせフォーム
  /* -------------------------------------------- */

  $(function () {
    // フォーム本体
    const $form = $(".contact-form__form");
  
    // フォーム上部のグローバルエラーメッセージ
    const $globalError = $(".contact-form__global-error");
  
    // テキスト入力・テキストエリア
    const $inputs = $(".contact-form__input, .contact-form__textarea");
  
    // ラジオボタン
    const $radios = $(".contact-form__radio");
  
    // チェックボックス
    const $checkboxes = $(".contact-form__checkbox");
  
    // =========================
    // ✅ 送信ボタンが押されたとき
    // =========================
    $form.on("submit", function (e) {
      let hasError = false; // エラーがあるかどうかの判定用フラグ
  
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
      const radioNames = [];
  
      // radio の name を重複なしで収集
      $radios.each(function () {
        const name = $(this).attr("name");
        if (!radioNames.includes(name)) {
          radioNames.push(name);
        }
      });
  
      // 各グループで1つも選ばれていなければエラー
      $.each(radioNames, function (index, name) {
        if ($(`input[name="${name}"]:checked`).length === 0) {
          $(`input[name="${name}"]`)
            .closest(".contact-form__field")
            .addClass("is-error");
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
        $globalError
          .text("※必須項目が入力されていません。入力してください。")
          .addClass("is-show");
  
        // エラーメッセージの位置までスクロール
        $("html, body").animate(
          {
            scrollTop: $globalError.offset().top - 40,
          },
          400
        );
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

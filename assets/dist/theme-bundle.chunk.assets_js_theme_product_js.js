"use strict";
(self["webpackChunkbigcommerce_cornerstone"] = self["webpackChunkbigcommerce_cornerstone"] || []).push([["assets_js_theme_product_js"],{

/***/ "./assets/js/theme/product.js":
/*!************************************!*\
  !*** ./assets/js/theme/product.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Product)
/* harmony export */ });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _product_reviews__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./product/reviews */ "./assets/js/theme/product/reviews.js");
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _common_product_details__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/product-details */ "./assets/js/theme/common/product-details.js");
/* harmony import */ var _product_video_gallery__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./product/video-gallery */ "./assets/js/theme/product/video-gallery.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
/*
 Import all product specific js
 */







var Product = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(Product, _PageManager);
  function Product(context) {
    var _this;
    _this = _PageManager.call(this, context) || this;
    _this.url = window.location.href;
    _this.$reviewLink = $('[data-reveal-id="modal-review-form"]');
    _this.$bulkPricingLink = $('[data-reveal-id="modal-bulk-pricing"]');
    _this.reviewModal = (0,_global_modal__WEBPACK_IMPORTED_MODULE_6__["default"])("#modal-review-form")[0];
    return _this;
  }
  var _proto = Product.prototype;
  _proto.onReady = function onReady() {
    var _this2 = this;
    // Listen for foundation modal close events to sanitize URL after review.
    $(document).on("close.fndtn.reveal", function () {
      if (_this2.url.indexOf("#write_review") !== -1 && typeof window.history.replaceState === "function") {
        window.history.replaceState(null, document.title, window.location.pathname);
      }
    });
    var validator;

    // Init collapsible
    (0,_common_collapsible__WEBPACK_IMPORTED_MODULE_2__["default"])();
    this.productDetails = new _common_product_details__WEBPACK_IMPORTED_MODULE_3__["default"]($(".productView"), this.context, window.BCData.product_attributes);
    this.productDetails.setProductVariant();
    (0,_product_video_gallery__WEBPACK_IMPORTED_MODULE_4__["default"])();
    this.bulkPricingHandler();
    var $reviewForm = (0,_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__.classifyForm)(".writeReview-form");
    if ($reviewForm.length === 0) return;
    var review = new _product_reviews__WEBPACK_IMPORTED_MODULE_1__["default"]({
      $reviewForm: $reviewForm
    });
    $("body").on("click", '[data-reveal-id="modal-review-form"]', function () {
      validator = review.registerValidation(_this2.context);
      _this2.ariaDescribeReviewInputs($reviewForm);
    });
    $reviewForm.on("submit", function () {
      if (validator) {
        validator.performCheck();
        return validator.areAll("valid");
      }
      return false;
    });
    this.productReviewHandler();
  };
  _proto.ariaDescribeReviewInputs = function ariaDescribeReviewInputs($form) {
    $form.find("[data-input]").each(function (_, input) {
      var $input = $(input);
      var msgSpanId = $input.attr("name") + "-msg";
      $input.siblings("span").attr("id", msgSpanId);
      $input.attr("aria-describedby", msgSpanId);
    });
  };
  _proto.productReviewHandler = function productReviewHandler() {
    if (this.url.indexOf("#write_review") !== -1) {
      this.$reviewLink.trigger("click");
    }
  };
  _proto.bulkPricingHandler = function bulkPricingHandler() {
    if (this.url.indexOf("#bulk_pricing") !== -1) {
      this.$bulkPricingLink.trigger("click");
    }
  };
  return Product;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./assets/js/theme/product/video-gallery.js":
/*!**************************************************!*\
  !*** ./assets/js/theme/product/video-gallery.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VideoGallery": () => (/* binding */ VideoGallery),
/* harmony export */   "default": () => (/* binding */ videoGallery)
/* harmony export */ });
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
var VideoGallery = /*#__PURE__*/function () {
  function VideoGallery($element) {
    this.$player = $element.find('[data-video-player]');
    this.$videos = $element.find('[data-video-item]');
    this.currentVideo = {};
    this.bindEvents();
  }
  var _proto = VideoGallery.prototype;
  _proto.selectNewVideo = function selectNewVideo(e) {
    e.preventDefault();
    var $target = $(e.currentTarget);
    this.currentVideo = {
      id: $target.data('videoId'),
      $selectedThumb: $target
    };
    this.setMainVideo();
    this.setActiveThumb();
  };
  _proto.setMainVideo = function setMainVideo() {
    this.$player.attr('src', "//www.youtube.com/embed/" + this.currentVideo.id);
  };
  _proto.setActiveThumb = function setActiveThumb() {
    this.$videos.removeClass('is-active');
    this.currentVideo.$selectedThumb.addClass('is-active');
  };
  _proto.bindEvents = function bindEvents() {
    this.$videos.on('click', this.selectNewVideo.bind(this));
  };
  return VideoGallery;
}();
function videoGallery() {
  var pluginKey = 'video-gallery';
  var $videoGallery = $("[data-" + pluginKey + "]");
  $videoGallery.each(function (index, element) {
    var $el = $(element);
    var isInitialized = $el.data(pluginKey) instanceof VideoGallery;
    if (isInitialized) {
      return;
    }
    $el.data(pluginKey, new VideoGallery($el));
  });
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLmFzc2V0c19qc190aGVtZV9wcm9kdWN0X2pzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ3lDO0FBQ0Y7QUFDZTtBQUNBO0FBQ0g7QUFDTTtBQUNmO0FBQUEsSUFFckJPLE9BQU8sMEJBQUFDLFlBQUE7RUFBQUMsY0FBQSxDQUFBRixPQUFBLEVBQUFDLFlBQUE7RUFDMUIsU0FBQUQsUUFBWUcsT0FBTyxFQUFFO0lBQUEsSUFBQUMsS0FBQTtJQUNuQkEsS0FBQSxHQUFBSCxZQUFBLENBQUFJLElBQUEsT0FBTUYsT0FBTyxDQUFDO0lBQ2RDLEtBQUEsQ0FBS0UsR0FBRyxHQUFHQyxNQUFNLENBQUNDLFFBQVEsQ0FBQ0MsSUFBSTtJQUMvQkwsS0FBQSxDQUFLTSxXQUFXLEdBQUdDLENBQUMsQ0FBQyxzQ0FBc0MsQ0FBQztJQUM1RFAsS0FBQSxDQUFLUSxnQkFBZ0IsR0FBR0QsQ0FBQyxDQUFDLHVDQUF1QyxDQUFDO0lBQ2xFUCxLQUFBLENBQUtTLFdBQVcsR0FBR2QseURBQVksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUFDLE9BQUFLLEtBQUE7RUFDM0Q7RUFBQyxJQUFBVSxNQUFBLEdBQUFkLE9BQUEsQ0FBQWUsU0FBQTtFQUFBRCxNQUFBLENBRURFLE9BQU8sR0FBUCxTQUFBQSxRQUFBLEVBQVU7SUFBQSxJQUFBQyxNQUFBO0lBQ1I7SUFDQU4sQ0FBQyxDQUFDTyxRQUFRLENBQUMsQ0FBQ0MsRUFBRSxDQUFDLG9CQUFvQixFQUFFLFlBQU07TUFDekMsSUFDRUYsTUFBSSxDQUFDWCxHQUFHLENBQUNjLE9BQU8sQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsSUFDeEMsT0FBT2IsTUFBTSxDQUFDYyxPQUFPLENBQUNDLFlBQVksS0FBSyxVQUFVLEVBQ2pEO1FBQ0FmLE1BQU0sQ0FBQ2MsT0FBTyxDQUFDQyxZQUFZLENBQ3pCLElBQUksRUFDSkosUUFBUSxDQUFDSyxLQUFLLEVBQ2RoQixNQUFNLENBQUNDLFFBQVEsQ0FBQ2dCLFFBQVEsQ0FDekI7TUFDSDtJQUNGLENBQUMsQ0FBQztJQUVGLElBQUlDLFNBQVM7O0lBRWI7SUFDQTlCLCtEQUFrQixFQUFFO0lBRXBCLElBQUksQ0FBQytCLGNBQWMsR0FBRyxJQUFJOUIsK0RBQWMsQ0FDdENlLENBQUMsQ0FBQyxjQUFjLENBQUMsRUFDakIsSUFBSSxDQUFDUixPQUFPLEVBQ1pJLE1BQU0sQ0FBQ29CLE1BQU0sQ0FBQ0Msa0JBQWtCLENBQ2pDO0lBQ0QsSUFBSSxDQUFDRixjQUFjLENBQUNHLGlCQUFpQixFQUFFO0lBRXZDaEMsa0VBQVksRUFBRTtJQUVkLElBQUksQ0FBQ2lDLGtCQUFrQixFQUFFO0lBRXpCLElBQU1DLFdBQVcsR0FBR2pDLHNFQUFZLENBQUMsbUJBQW1CLENBQUM7SUFFckQsSUFBSWlDLFdBQVcsQ0FBQ0MsTUFBTSxLQUFLLENBQUMsRUFBRTtJQUU5QixJQUFNQyxNQUFNLEdBQUcsSUFBSXZDLHdEQUFNLENBQUM7TUFBRXFDLFdBQVcsRUFBWEE7SUFBWSxDQUFDLENBQUM7SUFFMUNwQixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUNRLEVBQUUsQ0FBQyxPQUFPLEVBQUUsc0NBQXNDLEVBQUUsWUFBTTtNQUNsRU0sU0FBUyxHQUFHUSxNQUFNLENBQUNDLGtCQUFrQixDQUFDakIsTUFBSSxDQUFDZCxPQUFPLENBQUM7TUFDbkRjLE1BQUksQ0FBQ2tCLHdCQUF3QixDQUFDSixXQUFXLENBQUM7SUFDNUMsQ0FBQyxDQUFDO0lBRUZBLFdBQVcsQ0FBQ1osRUFBRSxDQUFDLFFBQVEsRUFBRSxZQUFNO01BQzdCLElBQUlNLFNBQVMsRUFBRTtRQUNiQSxTQUFTLENBQUNXLFlBQVksRUFBRTtRQUN4QixPQUFPWCxTQUFTLENBQUNZLE1BQU0sQ0FBQyxPQUFPLENBQUM7TUFDbEM7TUFFQSxPQUFPLEtBQUs7SUFDZCxDQUFDLENBQUM7SUFFRixJQUFJLENBQUNDLG9CQUFvQixFQUFFO0VBQzdCLENBQUM7RUFBQXhCLE1BQUEsQ0FFRHFCLHdCQUF3QixHQUF4QixTQUFBQSx5QkFBeUJJLEtBQUssRUFBRTtJQUM5QkEsS0FBSyxDQUFDQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUNDLElBQUksQ0FBQyxVQUFDQyxDQUFDLEVBQUVDLEtBQUssRUFBSztNQUM1QyxJQUFNQyxNQUFNLEdBQUdqQyxDQUFDLENBQUNnQyxLQUFLLENBQUM7TUFDdkIsSUFBTUUsU0FBUyxHQUFNRCxNQUFNLENBQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBTTtNQUU5Q0YsTUFBTSxDQUFDRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUNELElBQUksQ0FBQyxJQUFJLEVBQUVELFNBQVMsQ0FBQztNQUM3Q0QsTUFBTSxDQUFDRSxJQUFJLENBQUMsa0JBQWtCLEVBQUVELFNBQVMsQ0FBQztJQUM1QyxDQUFDLENBQUM7RUFDSixDQUFDO0VBQUEvQixNQUFBLENBRUR3QixvQkFBb0IsR0FBcEIsU0FBQUEscUJBQUEsRUFBdUI7SUFDckIsSUFBSSxJQUFJLENBQUNoQyxHQUFHLENBQUNjLE9BQU8sQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtNQUM1QyxJQUFJLENBQUNWLFdBQVcsQ0FBQ3NDLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUFDbkM7RUFDRixDQUFDO0VBQUFsQyxNQUFBLENBRURnQixrQkFBa0IsR0FBbEIsU0FBQUEsbUJBQUEsRUFBcUI7SUFDbkIsSUFBSSxJQUFJLENBQUN4QixHQUFHLENBQUNjLE9BQU8sQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtNQUM1QyxJQUFJLENBQUNSLGdCQUFnQixDQUFDb0MsT0FBTyxDQUFDLE9BQU8sQ0FBQztJQUN4QztFQUNGLENBQUM7RUFBQSxPQUFBaEQsT0FBQTtBQUFBLEVBbkZrQ1AscURBQVc7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWHpDLElBQU15RCxZQUFZO0VBQ3JCLFNBQUFBLGFBQVlDLFFBQVEsRUFBRTtJQUNsQixJQUFJLENBQUNDLE9BQU8sR0FBR0QsUUFBUSxDQUFDWCxJQUFJLENBQUMscUJBQXFCLENBQUM7SUFDbkQsSUFBSSxDQUFDYSxPQUFPLEdBQUdGLFFBQVEsQ0FBQ1gsSUFBSSxDQUFDLG1CQUFtQixDQUFDO0lBQ2pELElBQUksQ0FBQ2MsWUFBWSxHQUFHLENBQUMsQ0FBQztJQUN0QixJQUFJLENBQUNDLFVBQVUsRUFBRTtFQUNyQjtFQUFDLElBQUF6QyxNQUFBLEdBQUFvQyxZQUFBLENBQUFuQyxTQUFBO0VBQUFELE1BQUEsQ0FFRDBDLGNBQWMsR0FBZCxTQUFBQSxlQUFlQyxDQUFDLEVBQUU7SUFDZEEsQ0FBQyxDQUFDQyxjQUFjLEVBQUU7SUFFbEIsSUFBTUMsT0FBTyxHQUFHaEQsQ0FBQyxDQUFDOEMsQ0FBQyxDQUFDRyxhQUFhLENBQUM7SUFFbEMsSUFBSSxDQUFDTixZQUFZLEdBQUc7TUFDaEJPLEVBQUUsRUFBRUYsT0FBTyxDQUFDRyxJQUFJLENBQUMsU0FBUyxDQUFDO01BQzNCQyxjQUFjLEVBQUVKO0lBQ3BCLENBQUM7SUFFRCxJQUFJLENBQUNLLFlBQVksRUFBRTtJQUNuQixJQUFJLENBQUNDLGNBQWMsRUFBRTtFQUN6QixDQUFDO0VBQUFuRCxNQUFBLENBRURrRCxZQUFZLEdBQVosU0FBQUEsYUFBQSxFQUFlO0lBQ1gsSUFBSSxDQUFDWixPQUFPLENBQUNOLElBQUksQ0FBQyxLQUFLLCtCQUE2QixJQUFJLENBQUNRLFlBQVksQ0FBQ08sRUFBRSxDQUFHO0VBQy9FLENBQUM7RUFBQS9DLE1BQUEsQ0FFRG1ELGNBQWMsR0FBZCxTQUFBQSxlQUFBLEVBQWlCO0lBQ2IsSUFBSSxDQUFDWixPQUFPLENBQUNhLFdBQVcsQ0FBQyxXQUFXLENBQUM7SUFDckMsSUFBSSxDQUFDWixZQUFZLENBQUNTLGNBQWMsQ0FBQ0ksUUFBUSxDQUFDLFdBQVcsQ0FBQztFQUMxRCxDQUFDO0VBQUFyRCxNQUFBLENBRUR5QyxVQUFVLEdBQVYsU0FBQUEsV0FBQSxFQUFhO0lBQ1QsSUFBSSxDQUFDRixPQUFPLENBQUNsQyxFQUFFLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQ3FDLGNBQWMsQ0FBQ1ksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0VBQzVELENBQUM7RUFBQSxPQUFBbEIsWUFBQTtBQUFBO0FBR1UsU0FBU3JELFlBQVlBLENBQUEsRUFBRztFQUNuQyxJQUFNd0UsU0FBUyxHQUFHLGVBQWU7RUFDakMsSUFBTUMsYUFBYSxHQUFHM0QsQ0FBQyxZQUFVMEQsU0FBUyxPQUFJO0VBRTlDQyxhQUFhLENBQUM3QixJQUFJLENBQUMsVUFBQzhCLEtBQUssRUFBRUMsT0FBTyxFQUFLO0lBQ25DLElBQU1DLEdBQUcsR0FBRzlELENBQUMsQ0FBQzZELE9BQU8sQ0FBQztJQUN0QixJQUFNRSxhQUFhLEdBQUdELEdBQUcsQ0FBQ1gsSUFBSSxDQUFDTyxTQUFTLENBQUMsWUFBWW5CLFlBQVk7SUFFakUsSUFBSXdCLGFBQWEsRUFBRTtNQUNmO0lBQ0o7SUFFQUQsR0FBRyxDQUFDWCxJQUFJLENBQUNPLFNBQVMsRUFBRSxJQUFJbkIsWUFBWSxDQUFDdUIsR0FBRyxDQUFDLENBQUM7RUFDOUMsQ0FBQyxDQUFDO0FBQ04iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iaWdjb21tZXJjZS1jb3JuZXJzdG9uZS8uL2Fzc2V0cy9qcy90aGVtZS9wcm9kdWN0LmpzIiwid2VicGFjazovL2JpZ2NvbW1lcmNlLWNvcm5lcnN0b25lLy4vYXNzZXRzL2pzL3RoZW1lL3Byb2R1Y3QvdmlkZW8tZ2FsbGVyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuIEltcG9ydCBhbGwgcHJvZHVjdCBzcGVjaWZpYyBqc1xuICovXG5pbXBvcnQgUGFnZU1hbmFnZXIgZnJvbSBcIi4vcGFnZS1tYW5hZ2VyXCI7XG5pbXBvcnQgUmV2aWV3IGZyb20gXCIuL3Byb2R1Y3QvcmV2aWV3c1wiO1xuaW1wb3J0IGNvbGxhcHNpYmxlRmFjdG9yeSBmcm9tIFwiLi9jb21tb24vY29sbGFwc2libGVcIjtcbmltcG9ydCBQcm9kdWN0RGV0YWlscyBmcm9tIFwiLi9jb21tb24vcHJvZHVjdC1kZXRhaWxzXCI7XG5pbXBvcnQgdmlkZW9HYWxsZXJ5IGZyb20gXCIuL3Byb2R1Y3QvdmlkZW8tZ2FsbGVyeVwiO1xuaW1wb3J0IHsgY2xhc3NpZnlGb3JtIH0gZnJvbSBcIi4vY29tbW9uL3V0aWxzL2Zvcm0tdXRpbHNcIjtcbmltcG9ydCBtb2RhbEZhY3RvcnkgZnJvbSBcIi4vZ2xvYmFsL21vZGFsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2R1Y3QgZXh0ZW5kcyBQYWdlTWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcbiAgICBzdXBlcihjb250ZXh0KTtcbiAgICB0aGlzLnVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICAgIHRoaXMuJHJldmlld0xpbmsgPSAkKCdbZGF0YS1yZXZlYWwtaWQ9XCJtb2RhbC1yZXZpZXctZm9ybVwiXScpO1xuICAgIHRoaXMuJGJ1bGtQcmljaW5nTGluayA9ICQoJ1tkYXRhLXJldmVhbC1pZD1cIm1vZGFsLWJ1bGstcHJpY2luZ1wiXScpO1xuICAgIHRoaXMucmV2aWV3TW9kYWwgPSBtb2RhbEZhY3RvcnkoXCIjbW9kYWwtcmV2aWV3LWZvcm1cIilbMF07XG4gIH1cblxuICBvblJlYWR5KCkge1xuICAgIC8vIExpc3RlbiBmb3IgZm91bmRhdGlvbiBtb2RhbCBjbG9zZSBldmVudHMgdG8gc2FuaXRpemUgVVJMIGFmdGVyIHJldmlldy5cbiAgICAkKGRvY3VtZW50KS5vbihcImNsb3NlLmZuZHRuLnJldmVhbFwiLCAoKSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMudXJsLmluZGV4T2YoXCIjd3JpdGVfcmV2aWV3XCIpICE9PSAtMSAmJlxuICAgICAgICB0eXBlb2Ygd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICkge1xuICAgICAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoXG4gICAgICAgICAgbnVsbCxcbiAgICAgICAgICBkb2N1bWVudC50aXRsZSxcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWVcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGxldCB2YWxpZGF0b3I7XG5cbiAgICAvLyBJbml0IGNvbGxhcHNpYmxlXG4gICAgY29sbGFwc2libGVGYWN0b3J5KCk7XG5cbiAgICB0aGlzLnByb2R1Y3REZXRhaWxzID0gbmV3IFByb2R1Y3REZXRhaWxzKFxuICAgICAgJChcIi5wcm9kdWN0Vmlld1wiKSxcbiAgICAgIHRoaXMuY29udGV4dCxcbiAgICAgIHdpbmRvdy5CQ0RhdGEucHJvZHVjdF9hdHRyaWJ1dGVzXG4gICAgKTtcbiAgICB0aGlzLnByb2R1Y3REZXRhaWxzLnNldFByb2R1Y3RWYXJpYW50KCk7XG5cbiAgICB2aWRlb0dhbGxlcnkoKTtcblxuICAgIHRoaXMuYnVsa1ByaWNpbmdIYW5kbGVyKCk7XG5cbiAgICBjb25zdCAkcmV2aWV3Rm9ybSA9IGNsYXNzaWZ5Rm9ybShcIi53cml0ZVJldmlldy1mb3JtXCIpO1xuXG4gICAgaWYgKCRyZXZpZXdGb3JtLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gICAgY29uc3QgcmV2aWV3ID0gbmV3IFJldmlldyh7ICRyZXZpZXdGb3JtIH0pO1xuXG4gICAgJChcImJvZHlcIikub24oXCJjbGlja1wiLCAnW2RhdGEtcmV2ZWFsLWlkPVwibW9kYWwtcmV2aWV3LWZvcm1cIl0nLCAoKSA9PiB7XG4gICAgICB2YWxpZGF0b3IgPSByZXZpZXcucmVnaXN0ZXJWYWxpZGF0aW9uKHRoaXMuY29udGV4dCk7XG4gICAgICB0aGlzLmFyaWFEZXNjcmliZVJldmlld0lucHV0cygkcmV2aWV3Rm9ybSk7XG4gICAgfSk7XG5cbiAgICAkcmV2aWV3Rm9ybS5vbihcInN1Ym1pdFwiLCAoKSA9PiB7XG4gICAgICBpZiAodmFsaWRhdG9yKSB7XG4gICAgICAgIHZhbGlkYXRvci5wZXJmb3JtQ2hlY2soKTtcbiAgICAgICAgcmV0dXJuIHZhbGlkYXRvci5hcmVBbGwoXCJ2YWxpZFwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuXG4gICAgdGhpcy5wcm9kdWN0UmV2aWV3SGFuZGxlcigpO1xuICB9XG5cbiAgYXJpYURlc2NyaWJlUmV2aWV3SW5wdXRzKCRmb3JtKSB7XG4gICAgJGZvcm0uZmluZChcIltkYXRhLWlucHV0XVwiKS5lYWNoKChfLCBpbnB1dCkgPT4ge1xuICAgICAgY29uc3QgJGlucHV0ID0gJChpbnB1dCk7XG4gICAgICBjb25zdCBtc2dTcGFuSWQgPSBgJHskaW5wdXQuYXR0cihcIm5hbWVcIil9LW1zZ2A7XG5cbiAgICAgICRpbnB1dC5zaWJsaW5ncyhcInNwYW5cIikuYXR0cihcImlkXCIsIG1zZ1NwYW5JZCk7XG4gICAgICAkaW5wdXQuYXR0cihcImFyaWEtZGVzY3JpYmVkYnlcIiwgbXNnU3BhbklkKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByb2R1Y3RSZXZpZXdIYW5kbGVyKCkge1xuICAgIGlmICh0aGlzLnVybC5pbmRleE9mKFwiI3dyaXRlX3Jldmlld1wiKSAhPT0gLTEpIHtcbiAgICAgIHRoaXMuJHJldmlld0xpbmsudHJpZ2dlcihcImNsaWNrXCIpO1xuICAgIH1cbiAgfVxuXG4gIGJ1bGtQcmljaW5nSGFuZGxlcigpIHtcbiAgICBpZiAodGhpcy51cmwuaW5kZXhPZihcIiNidWxrX3ByaWNpbmdcIikgIT09IC0xKSB7XG4gICAgICB0aGlzLiRidWxrUHJpY2luZ0xpbmsudHJpZ2dlcihcImNsaWNrXCIpO1xuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFZpZGVvR2FsbGVyeSB7XG4gICAgY29uc3RydWN0b3IoJGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy4kcGxheWVyID0gJGVsZW1lbnQuZmluZCgnW2RhdGEtdmlkZW8tcGxheWVyXScpO1xuICAgICAgICB0aGlzLiR2aWRlb3MgPSAkZWxlbWVudC5maW5kKCdbZGF0YS12aWRlby1pdGVtXScpO1xuICAgICAgICB0aGlzLmN1cnJlbnRWaWRlbyA9IHt9O1xuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICB9XG5cbiAgICBzZWxlY3ROZXdWaWRlbyhlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBjb25zdCAkdGFyZ2V0ID0gJChlLmN1cnJlbnRUYXJnZXQpO1xuXG4gICAgICAgIHRoaXMuY3VycmVudFZpZGVvID0ge1xuICAgICAgICAgICAgaWQ6ICR0YXJnZXQuZGF0YSgndmlkZW9JZCcpLFxuICAgICAgICAgICAgJHNlbGVjdGVkVGh1bWI6ICR0YXJnZXQsXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5zZXRNYWluVmlkZW8oKTtcbiAgICAgICAgdGhpcy5zZXRBY3RpdmVUaHVtYigpO1xuICAgIH1cblxuICAgIHNldE1haW5WaWRlbygpIHtcbiAgICAgICAgdGhpcy4kcGxheWVyLmF0dHIoJ3NyYycsIGAvL3d3dy55b3V0dWJlLmNvbS9lbWJlZC8ke3RoaXMuY3VycmVudFZpZGVvLmlkfWApO1xuICAgIH1cblxuICAgIHNldEFjdGl2ZVRodW1iKCkge1xuICAgICAgICB0aGlzLiR2aWRlb3MucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICB0aGlzLmN1cnJlbnRWaWRlby4kc2VsZWN0ZWRUaHVtYi5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgfVxuXG4gICAgYmluZEV2ZW50cygpIHtcbiAgICAgICAgdGhpcy4kdmlkZW9zLm9uKCdjbGljaycsIHRoaXMuc2VsZWN0TmV3VmlkZW8uYmluZCh0aGlzKSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB2aWRlb0dhbGxlcnkoKSB7XG4gICAgY29uc3QgcGx1Z2luS2V5ID0gJ3ZpZGVvLWdhbGxlcnknO1xuICAgIGNvbnN0ICR2aWRlb0dhbGxlcnkgPSAkKGBbZGF0YS0ke3BsdWdpbktleX1dYCk7XG5cbiAgICAkdmlkZW9HYWxsZXJ5LmVhY2goKGluZGV4LCBlbGVtZW50KSA9PiB7XG4gICAgICAgIGNvbnN0ICRlbCA9ICQoZWxlbWVudCk7XG4gICAgICAgIGNvbnN0IGlzSW5pdGlhbGl6ZWQgPSAkZWwuZGF0YShwbHVnaW5LZXkpIGluc3RhbmNlb2YgVmlkZW9HYWxsZXJ5O1xuXG4gICAgICAgIGlmIChpc0luaXRpYWxpemVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAkZWwuZGF0YShwbHVnaW5LZXksIG5ldyBWaWRlb0dhbGxlcnkoJGVsKSk7XG4gICAgfSk7XG59XG4iXSwibmFtZXMiOlsiUGFnZU1hbmFnZXIiLCJSZXZpZXciLCJjb2xsYXBzaWJsZUZhY3RvcnkiLCJQcm9kdWN0RGV0YWlscyIsInZpZGVvR2FsbGVyeSIsImNsYXNzaWZ5Rm9ybSIsIm1vZGFsRmFjdG9yeSIsIlByb2R1Y3QiLCJfUGFnZU1hbmFnZXIiLCJfaW5oZXJpdHNMb29zZSIsImNvbnRleHQiLCJfdGhpcyIsImNhbGwiLCJ1cmwiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCIkcmV2aWV3TGluayIsIiQiLCIkYnVsa1ByaWNpbmdMaW5rIiwicmV2aWV3TW9kYWwiLCJfcHJvdG8iLCJwcm90b3R5cGUiLCJvblJlYWR5IiwiX3RoaXMyIiwiZG9jdW1lbnQiLCJvbiIsImluZGV4T2YiLCJoaXN0b3J5IiwicmVwbGFjZVN0YXRlIiwidGl0bGUiLCJwYXRobmFtZSIsInZhbGlkYXRvciIsInByb2R1Y3REZXRhaWxzIiwiQkNEYXRhIiwicHJvZHVjdF9hdHRyaWJ1dGVzIiwic2V0UHJvZHVjdFZhcmlhbnQiLCJidWxrUHJpY2luZ0hhbmRsZXIiLCIkcmV2aWV3Rm9ybSIsImxlbmd0aCIsInJldmlldyIsInJlZ2lzdGVyVmFsaWRhdGlvbiIsImFyaWFEZXNjcmliZVJldmlld0lucHV0cyIsInBlcmZvcm1DaGVjayIsImFyZUFsbCIsInByb2R1Y3RSZXZpZXdIYW5kbGVyIiwiJGZvcm0iLCJmaW5kIiwiZWFjaCIsIl8iLCJpbnB1dCIsIiRpbnB1dCIsIm1zZ1NwYW5JZCIsImF0dHIiLCJzaWJsaW5ncyIsInRyaWdnZXIiLCJkZWZhdWx0IiwiVmlkZW9HYWxsZXJ5IiwiJGVsZW1lbnQiLCIkcGxheWVyIiwiJHZpZGVvcyIsImN1cnJlbnRWaWRlbyIsImJpbmRFdmVudHMiLCJzZWxlY3ROZXdWaWRlbyIsImUiLCJwcmV2ZW50RGVmYXVsdCIsIiR0YXJnZXQiLCJjdXJyZW50VGFyZ2V0IiwiaWQiLCJkYXRhIiwiJHNlbGVjdGVkVGh1bWIiLCJzZXRNYWluVmlkZW8iLCJzZXRBY3RpdmVUaHVtYiIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJiaW5kIiwicGx1Z2luS2V5IiwiJHZpZGVvR2FsbGVyeSIsImluZGV4IiwiZWxlbWVudCIsIiRlbCIsImlzSW5pdGlhbGl6ZWQiXSwic291cmNlUm9vdCI6IiJ9
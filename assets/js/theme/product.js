/*
 Import all product specific js
 */
import PageManager from "./page-manager";
import Review from "./product/reviews";
import collapsibleFactory from "./common/collapsible";
import ProductDetails from "./common/product-details";
import videoGallery from "./product/video-gallery";
import { classifyForm } from "./common/utils/form-utils";
import modalFactory from "./global/modal";

export default class Product extends PageManager {
  constructor(context) {
    super(context);
    this.url = window.location.href;
    this.$reviewLink = $('[data-reveal-id="modal-review-form"]');
    this.$bulkPricingLink = $('[data-reveal-id="modal-bulk-pricing"]');
    this.reviewModal = modalFactory("#modal-review-form")[0];
  }

  onReady() {
    // Listen for foundation modal close events to sanitize URL after review.
    $(document).on("close.fndtn.reveal", () => {
      if (
        this.url.indexOf("#write_review") !== -1 &&
        typeof window.history.replaceState === "function"
      ) {
        window.history.replaceState(
          null,
          document.title,
          window.location.pathname
        );
      }
    });

    let validator;

    // Init collapsible
    collapsibleFactory();

    this.productDetails = new ProductDetails(
      $(".productView"),
      this.context,
      window.BCData.product_attributes
    );
    this.productDetails.setProductVariant();

    videoGallery();

    this.bulkPricingHandler();

    const $reviewForm = classifyForm(".writeReview-form");

    if ($reviewForm.length === 0) return;

    const review = new Review({ $reviewForm });

    $("body").on("click", '[data-reveal-id="modal-review-form"]', () => {
      validator = review.registerValidation(this.context);
      this.ariaDescribeReviewInputs($reviewForm);
    });

    $reviewForm.on("submit", () => {
      if (validator) {
        validator.performCheck();
        return validator.areAll("valid");
      }

      return false;
    });

    this.productReviewHandler();
  }

  ariaDescribeReviewInputs($form) {
    $form.find("[data-input]").each((_, input) => {
      const $input = $(input);
      const msgSpanId = `${$input.attr("name")}-msg`;

      $input.siblings("span").attr("id", msgSpanId);
      $input.attr("aria-describedby", msgSpanId);
    });
  }

  productReviewHandler() {
    if (this.url.indexOf("#write_review") !== -1) {
      this.$reviewLink.trigger("click");
    }
  }

  bulkPricingHandler() {
    if (this.url.indexOf("#bulk_pricing") !== -1) {
      this.$bulkPricingLink.trigger("click");
    }
  }
}

// Get all product cards
const productCards = document.querySelectorAll(".card");

// Loop through each card and add a mouseover event listener
productCards.forEach((card) => {
  card.addEventListener("mouseover", () => {
    // Get the product's image container element
    const imageContainer = card.querySelector(".card-image-container");

    // Get the second image element
    const secondImage = imageContainer.querySelector("img:nth-of-type(2)");

    // If the second image exists, show it
    if (secondImage) {
      secondImage.style.display = "block";
    }
  });

  // Add a mouseout event listener to hide the second image
  card.addEventListener("mouseout", () => {
    const imageContainer = card.querySelector(".card-image-container");
    const secondImage = imageContainer.querySelector("img:nth-of-type(2)");
    if (secondImage) {
      secondImage.style.display = "none";
    }
  });
});

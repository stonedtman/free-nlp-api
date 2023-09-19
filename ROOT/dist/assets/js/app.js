/*
Template Name: Shreyu - Responsive Bootstrap 4 Admin Dashboard
Author: CoderThemes
Version: 1.0.0
Website: https://coderthemes.com/
Contact: support@coderthemes.com
File: Main Js File
*/

!(function ($) {
  "use strict";

  var Components = function () {};

  //initializing tooltip
  (Components.prototype.initTooltipPlugin = function () {
    $.fn.tooltip && $('[data-toggle="tooltip"]').tooltip();
  }),
    //initializing popover
    (Components.prototype.initPopoverPlugin = function () {
      $.fn.popover && $('[data-toggle="popover"]').popover();
    }),
    //initializing Slimscroll
    (Components.prototype.initSlimScrollPlugin = function () {
      //You can change the color of scroll bar here
      $.fn.slimScroll &&
        $(".slimscroll").slimScroll({
          height: "auto",
          position: "right",
          size: "4px",
          touchScrollStep: 20,
          color: "#9ea5ab",
        });
    }),
    //initializing form validation
    (Components.prototype.initFormValidation = function () {
      $(".needs-validation").on("submit", function (event) {
        $(this).addClass("was-validated");
        if ($(this)[0].checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
          return false;
        }
        return true;
      });
    }),
    //initilizing
    (Components.prototype.init = function () {
      var $this = this;
      this.initTooltipPlugin(),
        this.initPopoverPlugin(),
        this.initSlimScrollPlugin(),
        this.initFormValidation();
    }),
    ($.Components = new Components()),
    ($.Components.Constructor = Components);
})(window.jQuery),
  (function ($) {
    "use strict";

    var App = function () {
      (this.$body = $("body")), (this.$window = $(window));
    };

    /**
    Resets the scroll
    */
    (App.prototype._resetSidebarScroll = function () {
      // sidebar - scroll container
      $(".slimscroll-menu").slimscroll({
        height: "auto",
        position: "right",
        size: "4px",
        color: "#9ea5ab",
        wheelStep: 5,
        touchScrollStep: 20,
      });
    }),
      /**
       * Initlizes the menu - top and sidebar
       */
      (App.prototype.initMenu = function () {
        var $this = this;

        // Left menu collapse
        $(".button-menu-mobile").on("click", function (event) {
          event.preventDefault();

          var layout = $this.$body.data("layout");
          if (layout === "topnav") {
            $(this).toggleClass("open");
            $("#topnav-menu-content").slideToggle(400);
          } else {
            $this.$body.toggleClass("sidebar-enable");
            if ($this.$window.width() >= 768) {
              $this.$body.toggleClass("left-side-menu-condensed");
            } else {
              $this.$body.removeClass("left-side-menu-condensed");
            }

            // sidebar - scroll container
            $this._resetSidebarScroll();
          }
        });

        // sidebar - main menu
        // activate the menu in left side bar based on url
        var layout = $this.$body.data("layout");
        if ($("#menu-bar").length) {
          if (layout !== "topnav") {
            // init menu
            new MetisMenu("#menu-bar");
            // sidebar - scroll container
            $this._resetSidebarScroll();

            $("#menu-bar a").each(function () {
              var pageUrl = window.location.href.split(/[?#]/)[0];
              if (this.href == pageUrl) {
                $(this).addClass("active");
                $(this).parent().addClass("mm-active"); // add active to li of the current link
                $(this).parent().parent().addClass("mm-show");
                $(this).parent().parent().prev().addClass("active"); // add active class to an anchor
                $(this).parent().parent().parent().addClass("mm-active");
                $(this).parent().parent().parent().parent().addClass("mm-show"); // add active to li of the current link
                $(this)
                  .parent()
                  .parent()
                  .parent()
                  .parent()
                  .parent()
                  .addClass("mm-active");
              }
            });
          } else {
            var menuRef = new MetisMenu("#menu-bar").on(
              "shown.metisMenu",
              function (event) {
                window.addEventListener("click", function menuClick(e) {
                  if (!event.target.contains(e.target)) {
                    menuRef.hide(event.detail.shownElement);
                    window.removeEventListener("click", menuClick);
                  }
                });
              }
            );
            $("#menu-bar a").each(function () {
              var pageUrl = window.location.href.split(/[?#]/)[0];
              if (this.href == pageUrl) {
                $(this).addClass("active");
                $(this).parent().addClass("active"); // add active to li of the current link
                $(this).parent().parent().prev().addClass("active"); // add active class to an anchor
                $(this).parent().parent().parent().addClass("active");
                $(this)
                  .parent()
                  .parent()
                  .parent()
                  .parent()
                  .parent()
                  .addClass("active");
              }
            });
          }
        }

        // right side-bar toggle
        $(".right-bar-toggle").on("click", function (e) {
          $("body").toggleClass("right-bar-enabled");
        });

        $(document).on("click", "body", function (e) {
          if ($(e.target).closest(".right-bar-toggle, .right-bar").length > 0) {
            return;
          }

          if (
            $(e.target).closest(".left-side-menu, .side-nav").length > 0 ||
            $(e.target).hasClass("button-menu-mobile") ||
            $(e.target).closest(".button-menu-mobile").length > 0
          ) {
            return;
          }

          $("body").removeClass("right-bar-enabled");
          $("body").removeClass("sidebar-enable");
          return;
        });

        // activate topnav menu
        // $('#topnav-menu li a').each(function () {
        //     var pageUrl = window.location.href.split(/[?#]/)[0];
        //     if (this.href == pageUrl) {
        //         $(this).addClass('active');
        //         $(this).parent().parent().addClass('active'); // add active to li of the current link
        //         $(this).parent().parent().parent().parent().addClass('active');
        //         $(this).parent().parent().parent().parent().parent().parent().addClass('active');
        //     }
        // });

        // // horizontal menu
        // $('#topnav-menu .dropdown-menu a.dropdown-toggle').on('click', function () {
        //     console.log("hello");
        //     if (
        //         !$(this)
        //             .next()
        //             .hasClass('show')
        //     ) {
        //         $(this)
        //             .parents('.dropdown-menu')
        //             .first()
        //             .find('.show')
        //             .removeClass('show');
        //     }
        //     var $subMenu = $(this).next('.dropdown-menu');
        //     $subMenu.toggleClass('show');

        //     return false;
        // });

        // Preloader
        $(window).on("load", function () {
          $("#status").fadeOut();
          $("#preloader").delay(350).fadeOut("slow");
        });
      }),
      /**
       * Init the layout - with broad sidebar or compact side bar
       */
      (App.prototype.initLayout = function () {
        // in case of small size, add class enlarge to have minimal menu
        if (this.$window.width() >= 768 && this.$window.width() <= 1024) {
          this.$body.addClass("left-side-menu-condensed");
        } else {
          if (this.$body.data("left-keep-condensed") != true) {
            this.$body.removeClass("left-side-menu-condensed");
          }
        }

        // if the layout is scrollable - let's remove the slimscroll class from menu
        if (this.$body.hasClass("scrollable-layout")) {
          $("#sidebar-menu").removeClass("slimscroll-menu");
        }
      }),
      //initilizing
      (App.prototype.init = function () {
        var $this = this;
        this.initLayout();
        this.initMenu();
        $.Components.init();
        // on window resize, make menu flipped automatically
        $this.$window.on("resize", function (e) {
          e.preventDefault();
          $this.initLayout();
          $this._resetSidebarScroll();
        });

        // feather
        feather.replace();
      }),
      ($.App = new App()),
      ($.App.Constructor = App);
  })(window.jQuery),
  //initializing main application module
  (function ($) {
    "use strict";
    $.App.init();
  })(window.jQuery);

!(function (o) {
  "use strict";
  function t() {}
  (t.prototype.initCustomSelect = function () {
    o('[data-plugin="customselect"]').select2();
  }),
    (t.prototype.initMultiSelect = function () {
      0 < o('[data-plugin="multiselect"]').length &&
        o('[data-plugin="multiselect"]').multiSelect(o(this).data());
    }),
    (t.prototype.initFlatpickr = function () {
      o("#basic-datepicker").flatpickr(),
        o("#datetime-datepicker").flatpickr({
          enableTime: !0,
          dateFormat: "Y-m-d H:i",
        }),
        o("#humanfd-datepicker").flatpickr({
          altInput: !0,
          altFormat: "F j, Y",
          dateFormat: "Y-m-d",
        }),
        o("#minmax-datepicker").flatpickr({
          minDate: "2020-01",
          maxDate: "2020-03",
        }),
        o("#disable-datepicker").flatpickr({
          onReady: function () {
            this.jumpToDate("2025-01");
          },
          disable: [
            "2025-01-10",
            "2025-01-21",
            "2025-01-30",
            new Date(2025, 4, 9),
          ],
          dateFormat: "Y-m-d",
        }),
        o("#multiple-datepicker").flatpickr({
          mode: "multiple",
          dateFormat: "Y-m-d",
        }),
        o("#conjunction-datepicker").flatpickr({
          mode: "multiple",
          dateFormat: "Y-m-d",
          conjunction: " :: ",
        }),
        o("#range-datepicker").flatpickr({ mode: "range" }),
        o("#inline-datepicker").flatpickr({ inline: !0 }),
        o("#basic-timepicker").flatpickr({
          enableTime: !0,
          noCalendar: !0,
          dateFormat: "H:i",
        }),
        o("#24hours-timepicker").flatpickr({
          enableTime: !0,
          noCalendar: !0,
          dateFormat: "H:i",
          time_24hr: !0,
        }),
        o("#minmax-timepicker").flatpickr({
          enableTime: !0,
          noCalendar: !0,
          dateFormat: "H:i",
          minDate: "16:00",
          maxDate: "22:30",
        }),
        o("#preloading-timepicker").flatpickr({
          enableTime: !0,
          noCalendar: !0,
          dateFormat: "H:i",
          defaultDate: "01:45",
        });
    }),
    (t.prototype.initColorpicker = function () {
      o("#basic-colorpicker").colorpicker(),
        o("#hexa-colorpicker").colorpicker({ format: "auto" }),
        o("#component-colorpicker").colorpicker({ format: null }),
        o("#horizontal-colorpicker").colorpicker({ horizontal: !0 }),
        o("#inline-colorpicker").colorpicker({
          color: "#DD0F20",
          inline: !0,
          container: !0,
        });
    }),
    (t.prototype.initTouchspin = function () {
      var a = {};
      o('[data-toggle="touchspin"]').each(function (t, i) {
        var e = o.extend({}, a, o(i).data());
        o(i).TouchSpin(e);
      });
    }),
    (t.prototype.init = function () {
      this.initCustomSelect(),
        this.initMultiSelect(),
        this.initFlatpickr(),
        this.initColorpicker(),
        this.initTouchspin();
    }),
    (o.Components = new t()),
    (o.Components.Constructor = t);
})(window.jQuery),
  (function () {
    "use strict";
    window.jQuery.Components.init();
  })();

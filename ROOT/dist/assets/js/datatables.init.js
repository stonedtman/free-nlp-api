$(document).ready(function() {
	$("#basic-datatable").DataTable({
		language: {
			paginate: {
				previous: "<i class='uil uil-angle-left'>",
				next: "<i class='uil uil-angle-right'>"
			}
		},
		drawCallback: function() {
			$(".dataTables_paginate > .pagination").addClass("pagination-rounded")
		}
	});
	var a = $("#datatable-buttons").DataTable({
		lengthChange: !1,
		buttons: ["copy", "print"],
		language: {
			paginate: {
				previous: "<i class='uil uil-angle-left'>",
				next: "<i class='uil uil-angle-right'>"
			}
		},
		drawCallback: function() {
			$(".dataTables_paginate > .pagination").addClass("pagination-rounded")
		}
	});
	$("#selection-datatable").DataTable({
		select: {
			style: "multi"
		},
		language: {
			paginate: {
				previous: "<i class='uil uil-angle-left'>",
				next: "<i class='uil uil-angle-right'>"
			}
		},
		drawCallback: function() {
			$(".dataTables_paginate > .pagination").addClass("pagination-rounded")
		}
	}), $("#key-datatable").DataTable({
		keys: !0,
		language: {
			paginate: {
				previous: "<i class='uil uil-angle-left'>",
				next: "<i class='uil uil-angle-right'>"
			}
		},
		drawCallback: function() {
			$(".dataTables_paginate > .pagination").addClass("pagination-rounded")
		}
	}), a.buttons().container().appendTo("#datatable-buttons_wrapper .col-md-6:eq(0)")
});

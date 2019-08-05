var promise;
promise = $.ajax({
  url: "table_data.json",
  dataType: "json",
  success: function(data) {
    console.log(data);
    getTableData(data);
  }
});

// Will use this failure case based on the our requirement
promise
  .done(function() {
    console.log("Promise ends...");
  })
  .fail(function() {
    console.log("Promise fails...");
  })
  .done(function() {
    console.log("Promise ends...");
  })
  .always(function() {
    console.log("Promise ends... always!");
  });
// });

var tableContent = "";

function getTableData(data) {
  console.log(data);
  $.each(data, function() {
    tableContent +=
      "<tr><td>" +
      this.movies +
      "</td><td>" +
      this.genre +
      "</td><td>" +
      this.studio +
      "</td><td>" +
      this.year +
      "</td>";
    ("</tr>");

    // Inject the whole content string into our existing HTML table
  });

  $("#movie_data").append(tableContent);
  // Instantiate pagination after data is available
  movies = new moviesList("movie_data", 10);
  movies.init();
  movies.showPageNav("movies", "pageNavPosition");
  movies.showPage(1);
}

function moviesList(tableName, itemsPerPage) {
  this.tableName = tableName;
  this.itemsPerPage = itemsPerPage;
  this.currentPage = 1;
  this.pages = 0;
  this.inited = false;
  this.showRecords = function(from, to) {
    var rows = document.getElementById(tableName).rows;

    for (var i = 1; i < rows.length; i++) {
      if (i < from || i > to) rows[i].style.display = "none";
      else rows[i].style.display = "";
    }
  };
  this.showPage = function(pageNumber) {
    if (!this.inited) {
      return;
    }
    var oldPage = document.getElementById("pg" + this.currentPage);
    oldPage.className = "pagination pagination-sm";
    this.currentPage = pageNumber;
    var newPage = document.getElementById("pg" + this.currentPage);
    newPage.className = "pg-selected";
    var from = (pageNumber - 1) * itemsPerPage + 1;
    var to = from + itemsPerPage - 1;
    this.showRecords(from, to);
  };
  this.prev = function() {
    if (this.currentPage > 1) this.showPage(this.currentPage - 1);
  };
  this.next = function() {
    if (this.currentPage < this.pages) {
      this.showPage(this.currentPage + 1);
    }
  };
  this.init = function() {
    var rows = document.getElementById(tableName).rows;
    var records = rows.length - 1;
    this.pages = Math.ceil(records / itemsPerPage);
    this.inited = true;
  };
  this.showPageNav = function(pagerName, positionId) {
    if (!this.inited) {
      return;
    }
    var element = document.getElementById(positionId);
    var pagerHtml =
      '<span onclick="' +
      pagerName +
      '.prev();" class="pagination pagination-sm"> &#171 Prev </span> | ';
    for (var page = 1; page <= this.pages; page++)
      pagerHtml +=
        '<span id="pg' +
        page +
        '" class="pagination pagination-sm" onclick="' +
        pagerName +
        ".showPage(" +
        page +
        ');">' +
        page +
        "</span> | ";
    pagerHtml +=
      '<span onclick="' +
      pagerName +
      '.next();" class="pagination pagination-sm"> Next &#187;</span>';
    element.innerHTML = pagerHtml;
  };
}

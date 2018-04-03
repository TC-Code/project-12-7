var board = {
  name: "Kanban Board",
  addColumn: function(column) {
    this.$element.append(column.$element);
    initSortable();
  },
  $element: $("#board .column-container")
};

$(".create-column").on("click", function() {
  var name = prompt("Enter a column name");
  if (name === "" || name === null) {
    alert("Please, enter a column name");
    return;
  } else {

  $.ajax({
    url: baseUrl + "/column",
    method: "POST",
    data: {
      name: name
    },
    success: function(response) {
      var column = new Column(response.id, name);
      board.addColumn(column);
    }
  });
}
});
function initSortable() {
  $(".column-card-list")
    .sortable({
      connectWith: ".column-card-list",
      placeholder: "card-placeholder"
    })
    .disableSelection();
}

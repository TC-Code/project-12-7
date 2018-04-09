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
  if (!name) return;

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
});

function initSortable() {
  $(".column-card-list")
    .sortable({
      connectWith: ".column-card-list",
      placeholder: "card-placeholder",
      receive: function(event, ui) {
        var columnId = ui.item.parents(".column").attr("column-id");
        var cardId = ui.item.attr("card-id");
        var cardName = ui.item.children(".card-description").text();

        $.ajax({
          url: baseUrl + "/card/" + cardId,
          method: "PUT",
          data: {
            id: cardId,
            name: cardName,
            bootcamp_kanban_column_id: columnId
          }
        });
      }
    })
    .disableSelection();
}

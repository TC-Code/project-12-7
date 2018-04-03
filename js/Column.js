function Column(id, name) {
  var self = this;

  this.id = id;
  this.name = name;
  this.$element = createColumn();

  function createColumn() {
    var $column = $("<div>").addClass("column");
    var $columnTitle = $("<h2>")
      .addClass("column-title")
      .text(self.name);
    var $columnCardList = $("<ul>").addClass("column-card-list");
    var $columnDelete = $("<button>")
      .addClass("btn-delete-column")
      .text("x");
    var $columnAddCard = $("<button>")
      .addClass("add-card")
      .text("Add a card");

    $columnDelete.on("click", function() {
      self.deleteColumn();
    });
    $columnAddCard.on("click", function() {
      var name = prompt("Enter the name of the card");
      $.ajax({
        url: baseUrl + "/card",
        method: "POST",
        data: {
          name: name,
          bootcamp_kanban_column_id: self.id
        },
        success: function(response) {
          var card = new Card(response.id, name);
          self.createCard(card);
        }
      });
    });

    $column
      .append($columnTitle)
      .append($columnDelete)
      .append($columnAddCard)
      .append($columnCardList);

    return $column;
  }
}
Column.prototype = {
  createCard: function(card) {
    this.$element.children("ul").append(card.$element);
  },
  deleteColumn: function() {
    var self = this;
    $.ajax({
      url: baseUrl + "/column/" + self.id,
      method: "DELETE",
      success: function(response) {
        self.element.remove();
      }
    });
  }
};

function Column(id, name) {
  var self = this;

  this.id = id;
  this.name = name || "No name given";
  this.$element = createColumn();

  function createColumn() {
    var $column = $("<div>")
      .addClass("column")
      .attr("column-id", self.id);
    var $columnEdit = $("<button>")
      .addClass("btn-edit-column-name")
      .html("<i class='far fa-edit'></i>");
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

    $columnEdit.on("click", function() {
      self.editColumn();
    });

    $columnAddCard.on("click", function() {
      var name = prompt("Enter the name of the card");
      event.preventDefault();
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
      .append($columnEdit)
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
        console.log(self);
        self.$element.remove();
      }
    });
  },

  editColumn: function() {
    var self = this;
    var newName = prompt("Edit column name:");
    if (newName === null) {
      newName = "No name given";
    } else {
      $.ajax({
        url: baseUrl + "/column/" + self.id,
        method: "PUT",
        data: {
          name: newName
        },
        success: function(response) {
          self.$element.children(".column-title").text(newName);
        }
      });
    }
  }
};

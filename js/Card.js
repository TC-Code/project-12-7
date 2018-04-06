function Card(id, name) {
  var self = this;

  this.id = id;
  this.name = name || "No name given";
  this.$element = createCard();

  function createCard() {
    var $card = $("<li>")
      .addClass("card")
      .attr("card-id", self.id);
    var $cardEdit = $("<button>")
      .addClass("btn-edit-card")
      .html("<i class='far fa-edit card-edit-icon'></i>");
    var $cardDescription = $("<p>")
      .addClass("card-description")
      .text(self.name);
    var $cardDelete = $("<button>")
      .addClass("btn-delete")
      .text("x");
    $cardDelete.on("click", function() {
      self.removeCard();
    });
    $cardEdit.on("click", function() {
      self.editCard();
    });

    $card.append($cardDelete);
    $card.append($cardEdit);
    $cardDescription.text(self.name);
    $card.append($cardDescription);
    return $card;
  }
}
Card.prototype = {
  removeCard: function() {
    var self = this;
    $.ajax({
      url: baseUrl + "/card/" + self.id,
      method: "DELETE",
      success: function() {
        self.$element.remove();
      }
    });
  },

  editCard: function() {
    var self = this;
    self.name = prompt("Edit card name:");
    var parentColumn = this.$element
      .closest("div[column-id]")
      .attr("column-id");
    console.log(parentColumn);
    if (self.name === null) {
      self.name = "No name given";
    } else {
      $.ajax({
        url: baseUrl + "/card/" + self.id,
        method: "PUT",
        data: {
          id: self.id,
          name: self.name,
          bootcamp_kanban_column_id: parseInt(parentColumn)
        },
        success: function(response) {
          self.$element.children(".card-description").text(self.name);
        }
      });
    }
  }
};

function Card(id, name) {
  if (name === "" || name === null) {
    //alert("Please, enter the name of the card");
    return;
  } else {
    var self = this;

    this.id = id;
    this.name = name;
    this.$element = createCard();

    function createCard() {
      var $card = $("<li>").addClass("card");
      var $cardDescription = $("<p>")
        .addClass("card-description")
        .text(self.name)
      var $cardDelete = $("<button>")
        .addClass("btn-delete")
        .text("x");
      $cardDelete.on("click", function() {
        self.removeCard();
      });

      $card.append($cardDelete);
      $cardDescription.text(self.name);
      $card.append($cardDescription);
      return $card;
    }
  }
}
Card.prototype = {
  removeCard: function() {
    var self = this;
    $.ajax({
      url: baseUrl + "/card/" + self.id,
      method: "DELETE",
      success: function() {
        self.element.remove();
      }
    });
  }
};

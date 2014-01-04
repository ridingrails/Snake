(function (root) {
  var SnakeGame = root.SnakeGame = (root.SnakeGame || {});

  var View = SnakeGame.View = function (element) {
    this.$el = element;
  }

  validKeyCodes = {
    "38": "N",
    "40": "S",
    "37": "W",
    "39": "E"
  }

  View.prototype.start = function () {
    this.board = new SnakeGame.Board(8);
    this.bindKeyEvents();
    setInterval(this.step, 500);
  }

  View.prototype.step = function () {
    this.board.snake.move();
    var renderedBoard = this.board.render();
    for (var i = 0; i < this.board.size; i++) {
      var row = renderedBoard[i];
      $(this.$el).append('<p>' + row.join() + '</p>');
    }
  }

  View.prototype.bindKeyEvents = function () {
    $(window).on('keydown', function(e) {
      handleKeyEvent(e);
    });
  }

  var handleKeyEvent = function (event) {
    var keyCode = event.keyCode;
    if (keyCode in validKeyCodes) {
      var dir = validKeyCodes[keyCode];
      this.board.snake.turn(dir);
    }
  }

})(this);
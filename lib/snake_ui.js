(function (root) {
  var SnakeGame = root.SnakeGame = (root.SnakeGame || {});

  var View = SnakeGame.View = function (element) {
    this.$el = element;

    this.board = null;
    this.intv = null;
  };

  View.validKeyCodes = {
    38: "N",
    40: "S",
    37: "W",
    39: "E"
  };

  View.STEPS = 100;

  View.prototype.handleKeyEvent = function (event) {
    if (_(View.validKeyCodes).has(event.keyCode)) {
      this.board.snake.turn(View.validKeyCodes[event.keyCode]);
    } else {

    }
  };

  View.prototype.render = function () {
    var view = this;
    var board = view.board;

    function buildGrid() {
      return _.times(board.size, function(){
        return _.times(board.size, function(){
          return $('<div class="cell"></div>');
        });
      });
    }

    var cellGrid = buildGrid();
    _(board.snake.segments).each(function (seg) {
      cellGrid[seg.i][seg.j].addClass("snake");
    });
    cellGrid[board.apple.position.i][board.apple.position.j].addClass("apple");

    this.$el.empty();
    _(cellGrid).each(function (row) {
      var $rowEl = $('<div class="row"></div>');
      _(row).each(function ($cell) { $rowEl.append($cell) });
      view.$el.append($rowEl);
    });
  };

  View.prototype.updateScore = function () {
    $('.score').html('Score: ' + SnakeGame.SCORE);
  };

  View.prototype.step = function () {
    if (_(this.board.snake.segments).last()) {
      this.board.snake.move();
			this.updateScore();
      this.render();
    } else {
			$('.score').html('You lose! You scored ' + SnakeGame.SCORE + ' points');
			$('.score').parent('div').addClass('lost');
			SnakeGame.SCORE = 0;
      window.clearInterval(this.intv);
    }
  };

  View.prototype.start = function() {
		SnakeGame.SCORE = 0;
    this.board = new SnakeGame.Board(20);

    $(window).keydown(this.handleKeyEvent.bind(this));

    this.intv = window.setInterval(
      this.step.bind(this),
      View.STEPS
    );
  };

  View.prototype.bindKeyEvents = function () {
    $(window).on('keydown', function(e) {
      handleKeyEvent(e);
    });
  };

})(this);

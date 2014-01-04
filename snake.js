(function (root) {
  var SnakeGame = root.SnakeGame = (root.SnakeGame || {});

  var Snake = SnakeGame.Snake = function () {
    this.dir;
    this.segments;
  }

  Snake.prototype.move = function () {
    // move snake in current direction
  }

  Snake.prototype.turn = function(newDir) {
    this.dir = newDir;
  }

  var Coord = SnakeGame.Coord = function () {
  }

  Coord.prototype.plus = function () {
  }

  var Board = SnakeGame.Board = function (size) {
    this.size = size;
    this.grid = new Array(size)
    for(var i=0; i < size; i++) {
      grid[i] = new Array(size);
    }
    this.snake = new Snake();
    this.apples = [];
  }

  Board.prototype.render = function () {
    var renderedBoard = new Array(this.size);
    for(var i = 0; i < this.size; i++) {
      renderedBoard[i] = new Array(this.size);
      for(var j = 0; j < this.size; j++) {
        var space = this.grid[i][j];
        if (space) {
          renderedBoard[i][j] = "S";
        } else {
          renderedBoard[i][j] = ".";
        }
      }
    }
    return renderedBoard;
  }

})(this);
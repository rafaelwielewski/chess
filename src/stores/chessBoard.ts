import { defineStore } from 'pinia';
import { ChessBoard } from 'src/domain/entities/ChessBoard';
import { ChessPosition } from 'src/domain/entities/value_objects/ChessPosition';

export const useChessBoardStore = defineStore({
  id: 'chessBoard',
  state: () => ({
    chessBoard: new ChessBoard(),
    selectedPosition: null as ChessPosition | null,
    possibleMoves: [] as ChessPosition[]
  }),
  actions: {
    getPossibleMoves (position: { x: number; y: number }) {
      return this.chessBoard.getPossibleMoves(position);
    },

    movePiece (from: { x: number; y: number }, to: { x: number; y: number }) {
      this.chessBoard.movePiece(from, to);
    },

    showHighlights (x: number, y: number) {
      this.chessBoard.squares[x][y].isSelected = true;
      this.selectedPosition = { x, y };

      this.possibleMoves = this.chessBoard.getPossibleMoves({ x, y });
      console.log(this.possibleMoves);
      this.possibleMoves.forEach((e) => {
        this.chessBoard.squares[e.x][e.y].isMovePossible = true;
        console.log(this.chessBoard.squares[e.x][e.y]);
      });

      // hightlight
    },

    clearHighlights () {
      if (this.selectedPosition != null) this.chessBoard.squares[this.selectedPosition.x][this.selectedPosition.y].isSelected = false;
      this.selectedPosition = null;

      this.possibleMoves.forEach((e) => {
        this.chessBoard.squares[e.x][e.y].isMovePossible = false;
      });
      this.possibleMoves = [];
    },

    handleClick (x: number, y: number) {
      const clickedPosition = { x, y };

      // check if selected position is null and piece is turn color
      if (this.selectedPosition === null && this.chessBoard.pieces[x][y] !== null && this.chessBoard.pieces[x][y]?.color !== this.chessBoard.turn)
        return;

      // Check if selected position is null and if the clicked position is a piece
      if (this.selectedPosition !== null && this.chessBoard.pieces[x][y] !== null && this.chessBoard.pieces[x][y]?.color !== this.chessBoard.turn) {
        this.clearHighlights();
        return;
      }

      // Check if selected position is null and if the clicked position is a piece
      if (this.selectedPosition === null && this.chessBoard.pieces[x][y] !== null) return this.showHighlights(x, y);

      // Check if selected position is not null and if the clicked position is not a possible move and if the clicked position is not a piece
      if (this.selectedPosition !== null && !this.possibleMoves.some((pos) => pos.x === x && pos.y === y) && this.chessBoard.pieces[x][y] === null) {
        this.clearHighlights();
        this.selectedPosition = null;
        this.possibleMoves = [];
        return;
      }

      // Check if selected position is not null and if the clicked position is not a possible move and if the clicked position is a piece
      if (this.selectedPosition !== null && this.chessBoard.pieces[x][y] !== null) {
        this.clearHighlights();
        this.showHighlights(x, y);
        return;
      }

      // Check if selected position is not null and if the clicked position is a possible move
      if (this.selectedPosition !== null && this.chessBoard.squares[x][y].isMovePossible) {
        this.movePiece(this.selectedPosition, { x, y });
        this.clearHighlights();
      }
    },

    resetBoard () {
      this.chessBoard = new ChessBoard();
    }
  }
});

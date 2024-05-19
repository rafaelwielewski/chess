import { defineStore } from 'pinia';
import { ChessBoard } from 'src/domain/entities/ChessBoard';
import { ChessPosition } from 'src/domain/entities/value_objects/ChessPosition';

export const useChessBoardStore = defineStore({
  id: 'chessBoard',
  state: () => ({
    chessBoard: new ChessBoard(),
    selectedPosition: null as ChessPosition | null,
    possibleMoves: [] as ChessPosition[],
    possibleCaptures: [] as ChessPosition[]
  }),
  actions: {
    getPossibleMoves (position: { x: number; y: number }) {
      return this.chessBoard.getPossibleMoves(position);
    },

    movePiece (from: { x: number; y: number }, to: { x: number; y: number }) {
      this.chessBoard.movePiece(from, to);
    },

    capturePiece (from: { x: number; y: number }, to: { x: number; y: number }) {
      this.chessBoard.capturePiece(from, to);
    },

    showMoveHighlights (x: number, y: number) {
      this.chessBoard.squares[x][y].isSelected = true;
      this.selectedPosition = { x, y };

      this.possibleMoves = this.chessBoard.getPossibleMoves({ x, y });
      this.possibleMoves.forEach((e) => {
        this.chessBoard.squares[e.x][e.y].isMovePossible = true;
      });

      // hightlight
    },

    showCaptureHighlights (x: number, y: number) {
      this.chessBoard.squares[x][y].isSelected = true;
      this.selectedPosition = { x, y };

      this.possibleCaptures = this.chessBoard.getPossibleCaptures({ x, y });
      this.possibleCaptures.forEach((e) => {
        this.chessBoard.squares[e.x][e.y].isCapturePossible = true;
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

      this.possibleCaptures.forEach((e) => {
        this.chessBoard.squares[e.x][e.y].isCapturePossible = false;
      });
      this.possibleCaptures = [];
    },

    handleClick (x: number, y: number) {
      const selectedPiece = this.chessBoard.pieces[x][y];
      const selectedSquare = this.chessBoard.squares[x][y];
      const isSelecting = this.selectedPosition === null;
      const isPieceTurn = selectedPiece?.color === this.chessBoard.turn;
      const isPiece = selectedPiece !== null;
      const isPieceAlreadySelected = this.selectedPosition?.x === x && this.selectedPosition?.y === y;

      // check if selected position is null and piece is turn color
      if (isSelecting && isPiece && !isPieceTurn)
        return;

      // Check if selected position is not null and piece is already selected
      if (this.selectedPosition && isPieceAlreadySelected) {
        this.clearHighlights();
      }

      // Check if selected position is not null and if the clicked position is a possible capture
      if (this.selectedPosition && selectedSquare.isCapturePossible) {
        this.capturePiece(this.selectedPosition, { x, y });
        this.clearHighlights();
      }

      // Check if selected position is null and if the clicked position is a piece
      if (this.selectedPosition && isPiece && !isPieceTurn) {
        this.clearHighlights();
      }

      // Check if selected position is null and if the clicked position is a piece
      if (isSelecting && isPiece && isPieceTurn) {
        this.showMoveHighlights(x, y);
        this.showCaptureHighlights(x, y);
      }

      // Check if selected position is not null and if the clicked position is not a possible move and if the clicked position is a piece
      if (this.selectedPosition && isPiece) {
        this.clearHighlights();
        this.showMoveHighlights(x, y);
        this.showCaptureHighlights(x, y);
      }

      // Check if selected position is not null and if the clicked position is a possible move
      if (this.selectedPosition && selectedSquare.isMovePossible) {
        this.movePiece(this.selectedPosition, { x, y });
        this.clearHighlights();
      }
    },

    resetBoard () {
      this.chessBoard = new ChessBoard();
    }
  }
});

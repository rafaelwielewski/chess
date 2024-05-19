import type { ChessPiece } from './ChessPiece';
import { Pawn } from './Pawn';
import { Rook } from './Rook';
import { Bishop } from './Bishop';
import { Knight } from './Knight';
import { Queen } from './Queen';
import { King } from './King';
import { ChessColor } from './value_objects/ChessColor';
import { ChessSquare } from './ChessSquare';
import { PiecesName } from './value_objects/PiecesTypes';

export class ChessBoard {
  public readonly size: number = 8;
  public turn: ChessColor = ChessColor.White;
  public check = false;
  public checkMate = false;
  public staleMate = false;
  public squares: ChessSquare[][] = this.initializeBoardSquares();
  public pieces: (ChessPiece | null)[][] = this.initializeBoardPieces();

  getPossibleMoves (position: { x: number; y: number }): { x: number; y: number }[] {
    const piece = this.pieces[position.x][position.y];
    console.log(piece);
    if (!piece) return [];

    let possibleMoves = piece.getPossibleMoves();

    // Remove movimentos que passam por cima de peças
    possibleMoves = possibleMoves.filter((move) => {
      const piece = this.pieces[move.x][move.y];
      return !piece;
    });

    // remove movimentos que que não podem pular peças
    if (!piece.canJumpPieces) {
      possibleMoves = possibleMoves.filter((move) => {
        const dx = move.x - position.x;
        const dy = move.y - position.y;
        const stepX = dx === 0 ? 0 : dx > 0 ? 1 : -1;
        const stepY = dy === 0 ? 0 : dy > 0 ? 1 : -1;
        let x = position.x + stepX;
        let y = position.y + stepY;
        while (x !== move.x || y !== move.y) {
          if (this.pieces[x][y]) {
            return false;
          }
          x += stepX;
          y += stepY;
        }
        return true;
      });
    }

    // remove movimentos que deixam o rei em xeque

    return possibleMoves;
  }

  getPossibleCaptures (position: { x: number; y: number }): { x: number; y: number }[] {
    const piece = this.pieces[position.x][position.y];
    if (!piece) return [];

    let possibleCaptures = piece.getPossibleCapturesMoves();

    // Remove movimentos que passam por cima de peças
    possibleCaptures = possibleCaptures.filter((move) => {
      const piece = this.pieces[move.x][move.y];
      return piece && piece.color !== this.turn;
    });

    // remove movimentos que que não podem pular peças
    if (!piece.canJumpPieces) {
      possibleCaptures = possibleCaptures.filter((move) => {
        const dx = move.x - position.x;
        const dy = move.y - position.y;
        const stepX = dx === 0 ? 0 : dx > 0 ? 1 : -1;
        const stepY = dy === 0 ? 0 : dy > 0 ? 1 : -1;
        let x = position.x + stepX;
        let y = position.y + stepY;
        while (x !== move.x || y !== move.y) {
          if (this.pieces[x][y]) {
            return false;
          }
          x += stepX;
          y += stepY;
        }
        return true;
      });
    }

    // remove movimentos que deixam o rei em xeque

    return possibleCaptures;
  }

  movePiece (from: { x: number; y: number }, to: { x: number; y: number }): void {
    const piece = this.pieces[from.x][from.y];
    if (!piece) return;

    this.pieces[to.x][to.y] = piece;
    piece.move(to);
    this.pieces[from.x][from.y] = null;
    // change turn
    this.turn = this.turn === ChessColor.White ? ChessColor.Black : ChessColor.White;
  }

  capturePiece (from: { x: number; y: number }, to: { x: number; y: number }): void {
    const piece = this.pieces[from.x][from.y];
    if (!piece) return;

    // move piece
    this.pieces[to.x][to.y] = piece;
    piece.move(to);

    // remove captured piece
    this.pieces[from.x][from.y] = null;

    // check for checkmate and stalemate
    if (this.isKingInCheck(this.turn) && !this.canKingMove(this.turn)) {
      this.checkMate = true;
      return;
    } else if (!this.canPlayerMove(this.turn)) {
      this.staleMate = true;
      return;
    }

    // change turn
    this.turn = this.turn === ChessColor.White ? ChessColor.Black : ChessColor.White;
  }

  isKingInCheck (color: ChessColor): boolean {
    const king = this.pieces.flat().find((piece) => piece?.name === 'King' && piece.color === color);
    if (!king) return false;

    const kingPosition = king.position;
    const opponentColor = color === ChessColor.White ? ChessColor.Black : ChessColor.White;
    const opponentPieces = this.pieces.flat().filter((piece) => piece?.color === opponentColor);

    for (const piece of opponentPieces) {
      const possibleCaptures = piece?.getPossibleCapturesMoves();
      if (possibleCaptures && possibleCaptures.find((move) => move.x === kingPosition.x && move.y === kingPosition.y)) {
        return true;
      }
    }

    return false;
  }

  canKingMove (color: ChessColor): boolean {
    const king = this.pieces.flat().find((piece) => piece?.name === PiecesName.King && piece.color === color);
    if (!king) return false;

    const kingPosition = king.position;
    const possibleMoves = king.getPossibleMoves();
    for (const move of possibleMoves) {
    // Save the current position
      const currentPiece = this.pieces[move.x][move.y];

      // Temporarily move the king
      this.pieces[move.x][move.y] = king;
      this.pieces[kingPosition.x][kingPosition.y] = null;

      const isInCheck = this.isKingInCheck(color);

      // Move the king back
      this.pieces[kingPosition.x][kingPosition.y] = king;
      this.pieces[move.x][move.y] = currentPiece;

      if (!isInCheck) {
        return true;
      }
    }

    return false;
  }

  canPlayerMove (color: ChessColor): boolean {
    const playerPieces = this.pieces.flat().filter((piece) => piece?.color === color);
    for (const piece of playerPieces) {
      if (piece) {
        const possibleMoves = piece.getPossibleMoves();
        if (possibleMoves) {
          for (const move of possibleMoves) {
            // Save the current position
            const currentPiece = this.pieces[move.x][move.y];

            // Temporarily move the piece
            this.pieces[move.x][move.y] = piece;
            this.pieces[piece.position.x][piece.position.y] = null;

            const isInCheck = this.isKingInCheck(color);

            // Move the piece back
            this.pieces[piece.position.x][piece.position.y] = piece;
            this.pieces[move.x][move.y] = currentPiece;

            if (!isInCheck) {
              return true;
            }
          }
        }
      }
    }

    return false;
  }

  initializeBoardSquares (): ChessSquare[][] {
    const board: ChessSquare[][] = Array(8)
      .fill(null)
      .map(() => Array(8).fill(null));

    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        const color = (x + y) % 2 === 0 ? ChessColor.White : ChessColor.Black;
        board[x][y] = new ChessSquare({
          color,
          isSelected: false,
          isMovePossible: false,
          isCapturePossible: false
        });
      }
    }

    return board;
  }

  initializeBoardPieces (): ChessPiece[][] {
    const board: ChessPiece[][] = Array(8)
      .fill(null)
      .map(() => Array(8).fill(null));

    for (let i = 0; i < 8; i++) {
      board[i][1] = new Pawn({ color: ChessColor.Black, position: { x: i, y: 1 } });
      board[i][6] = new Pawn({ color: ChessColor.White, position: { x: i, y: 6 } });
    }

    board[0][0] = new Rook({ color: ChessColor.Black, position: { x: 0, y: 0 } });
    board[1][0] = new Knight({ color: ChessColor.Black, position: { x: 1, y: 0 } });
    board[2][0] = new Bishop({ color: ChessColor.Black, position: { x: 2, y: 0 } });
    board[3][0] = new Queen({ color: ChessColor.Black, position: { x: 3, y: 0 } });
    board[4][0] = new King({ color: ChessColor.Black, position: { x: 4, y: 0 } });
    board[5][0] = new Bishop({ color: ChessColor.Black, position: { x: 5, y: 0 } });
    board[6][0] = new Knight({ color: ChessColor.Black, position: { x: 6, y: 0 } });
    board[7][0] = new Rook({ color: ChessColor.Black, position: { x: 7, y: 0 } });

    board[0][7] = new Rook({ color: ChessColor.White, position: { x: 0, y: 7 } });
    board[1][7] = new Knight({ color: ChessColor.White, position: { x: 1, y: 7 } });
    board[2][7] = new Bishop({ color: ChessColor.White, position: { x: 2, y: 7 } });
    board[3][7] = new Queen({ color: ChessColor.White, position: { x: 3, y: 7 } });
    board[4][7] = new King({ color: ChessColor.White, position: { x: 4, y: 7 } });
    board[5][7] = new Bishop({ color: ChessColor.White, position: { x: 5, y: 7 } });
    board[6][7] = new Knight({ color: ChessColor.White, position: { x: 6, y: 7 } });
    board[7][7] = new Rook({ color: ChessColor.White, position: { x: 7, y: 7 } });

    return board;
  }
}

import type { ChessPiece } from './ChessPiece';
import { Pawn } from './Pawn';
import { Rook } from './Rook';
import { Bishop } from './Bishop';
import { Knight } from './Knight';
import { Queen } from './Queen';
import { King } from './King';
import { ChessColor } from './value_objects/ChessColor';
import { ChessSquare } from './ChessSquare';

export class ChessBoard {
  public readonly size: number = 8;
  public readonly turn: ChessColor = ChessColor.White;
  public readonly check: boolean = false;
  public readonly checkMate: boolean = false;
  public readonly staleMate: boolean = false;
  public squares: ChessSquare[][] = this.initializeBoardSquares();
  public pieces: ChessPiece[][] = this.initializeBoardPieces();
  constructor() {}

  getPossibleMoves(position: { x: number; y: number }): { x: number; y: number }[] {
    const piece = this.pieces[position.y][position.x];
    console.log(position.x + ' ' + position.y);
    console.log(piece);
    if (!piece) return [];

    const moves: { x: number; y: number }[] = [];

    // Movimento vertical
    for (let i = 1; i <= piece.moveVerticalDistance; i++) {
      if (piece.color === ChessColor.White) {
        if (position.x - i >= 0 && (piece.canMoveBackwards || i === 1)) {
          moves.push({ x: position.x - i, y: position.y });
        }
        if (position.x + i < this.size && (piece.canMoveBackwards || i === 1)) {
          moves.push({ x: position.x + i, y: position.y });
        }
        if (piece.canMoveTwoSpacesFromStart && piece.firstMove) {
          if (position.x - i >= 0 && position.x - i - 1 >= 0) {
            moves.push({ x: position.x - i - 1, y: position.y });
          }
          if (position.x + i < this.size && position.x + i + 1 < this.size) {
            moves.push({ x: position.x + i + 1, y: position.y });
          }
        }
      } else {
        if (position.x - i >= 0 && (piece.canMoveBackwards || i === 1)) {
          moves.push({ x: position.x - i, y: position.y });
        }
        if (position.x + i < this.size && (piece.canMoveBackwards || i === 1)) {
          moves.push({ x: position.x + i, y: position.y });
        }
      }
    }

    // // Movimento horizontal
    // for (let i = 1; i <= piece.moveHorizontalDistance; i++) {
    //   if (position.x - i >= 0) {
    //     moves.push({ x: position.x - i, y: position.y });
    //   }
    //   if (position.x + i < this.size) {
    //     moves.push({ x: position.x + i, y: position.y });
    //   }
    // }

    // Movimento diagonal
    // if (piece.canMoveDiagonally) {
    //   for (let i = 1; i < this.size; i++) {
    //     if (position.x - i >= 0 && position.y - i >= 0) {
    //       moves.push({ x: position.x - i, y: position.y - i });
    //     }
    //     if (position.x - i >= 0 && position.y + i < this.size) {
    //       moves.push({ x: position.x - i, y: position.y + i });
    //     }
    //     if (position.x + i < this.size && position.y - i >= 0) {
    //       moves.push({ x: position.x + i, y: position.y - i });
    //     }
    //     if (position.x + i < this.size && position.y + i < this.size) {
    //       moves.push({ x: position.x + i, y: position.y + i });
    //     }
    //   }
    // }

    // Movimentos especiais
    // if (piece.specialMovePatterns) {
    //   for (const pattern of piece.specialMovePatterns) {
    //     const newX = position.x + pattern.x;
    //     const newY = position.y + pattern.y;
    //     if (newX >= 0 && newX < this.size && newY >= 0 && newY < this.size) {
    //       moves.push({ x: newX, y: newY });
    //     }
    //   }
    // }
    return moves;

    // Remover movimentos que não são possíveis devido a outras peças
    return moves.filter((move) => {
      const targetPiece = this.pieces[move.x][move.y];
      return !targetPiece || targetPiece.color !== piece.color;
    });
  }

  // movePiece(from: { x: number; y: number }, to: { x: number; y: number }): void {
  //   const piece = this.pieces[from.x][from.y];
  //   if (!piece) return;

  //   this.pieces[to.x][to.y] = piece;
  //   this.pieces[from.x][from.y] = null;
  // }

  initializeBoardSquares(): ChessSquare[][] {
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
        });
      }
    }
    console.log(board);

    return board;
  }

  initializeBoardPieces(): ChessPiece[][] {
    const board: ChessPiece[][] = Array(8)
      .fill(null)
      .map(() => Array(8).fill(null));

    for (let i = 0; i < 8; i++) {
      board[1][i] = new Pawn({ color: ChessColor.Black });
      board[6][i] = new Pawn({ color: ChessColor.White });
    }

    board[0][0] = new Rook({ color: ChessColor.Black });
    board[0][7] = new Rook({ color: ChessColor.Black });
    board[7][0] = new Rook({ color: ChessColor.White });
    board[7][7] = new Rook({ color: ChessColor.White });

    board[0][1] = new Knight({ color: ChessColor.Black });
    board[0][6] = new Knight({ color: ChessColor.Black });
    board[7][1] = new Knight({ color: ChessColor.White });
    board[7][6] = new Knight({ color: ChessColor.White });

    board[0][2] = new Bishop({ color: ChessColor.Black });
    board[0][5] = new Bishop({ color: ChessColor.Black });
    board[7][2] = new Bishop({ color: ChessColor.White });
    board[7][5] = new Bishop({ color: ChessColor.White });

    board[0][3] = new Queen({ color: ChessColor.Black });
    board[7][3] = new Queen({ color: ChessColor.White });

    board[0][4] = new King({ color: ChessColor.Black });
    board[7][4] = new King({ color: ChessColor.White });

    console.log(board);

    return board;
  }
}

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
  public turn: ChessColor = ChessColor.White;
  public check = false;
  public checkMate = false;
  public staleMate = false;
  public squares: ChessSquare[][] = this.initializeBoardSquares();
  public pieces: (ChessPiece | null)[][] = this.initializeBoardPieces();

  getPossibleMoves (position: { x: number; y: number }): { x: number; y: number }[] {
    const piece = this.pieces[position.x][position.y];
    console.log('x: ' + position.x + ' y: ' + position.y);
    console.log(piece);
    if (!piece) return [];

    const moves: { x: number; y: number }[] = [];

    // Movimento vertical
    for (let i = 1; i <= piece.moveVerticalDistance; i++) {
      if (piece.color === ChessColor.White) {
        // if first move and can move 2 squares
        if (position.y === 6 && piece.canMoveTwoSpacesFromStart) {
          moves.push({ x: position.x, y: position.y - 2 });
        }
        if (position.y - i >= 0) {
          // Check if there is a piece in the way
          const pieceInWay = this.pieces[position.x][position.y - i];
          if (pieceInWay) {
            break;
          }
          moves.push({ x: position.x, y: position.y - i });
        }
      } else {
        // if first move and can move 2 squares
        if (position.y === 1 && piece.canMoveTwoSpacesFromStart) {
          moves.push({ x: position.x, y: position.y + 2 });
        }
        if (position.y + i < this.size) {
          // Check if there is a piece in the way
          const pieceInWay = this.pieces[position.x][position.y + i];
          if (pieceInWay) {
            break;
          }
          moves.push({ x: position.x, y: position.y + i });
        }
      }
    }

    // Movimento horizontal
    for (let i = 1; i <= piece.moveHorizontalDistance; i++) {
      // Check if there is a piece in the way to the left
      if (position.x - i >= 0) {
        const pieceInWay = this.pieces[position.x - i][position.y];
        if (pieceInWay) {
          break;
        }
        moves.push({ x: position.x - i, y: position.y });
      }

      // Check if there is a piece in the way to the right
      if (position.x + i < this.size) {
        const pieceInWay = this.pieces[position.x + i][position.y];
        if (pieceInWay) {
          break;
        }
        moves.push({ x: position.x + i, y: position.y });
      }
    }

    // Movimento diagonal
    // Diagonal superior esquerda
    for (let i = 1; i <= piece.moveDiagonalDistance; i++) {
      console.log(i);
      if (position.x - i >= 0 && position.y - i >= 0) {
        const pieceInWay = this.pieces[position.x - i][position.y - i];
        console.log(pieceInWay);
        if (pieceInWay) {
          break;
        }
        moves.push({ x: position.x - i, y: position.y - i });
      }
    }
    // Diagonal superior direita
    for (let i = 1; i <= piece.moveDiagonalDistance; i++) {
      if (position.x - i >= 0 && position.y + i < this.size) {
        const pieceInWay = this.pieces[position.x - i][position.y + i];
        if (pieceInWay) {
          break;
        }
        moves.push({ x: position.x - i, y: position.y + i });
      }
    }
    for (let i = 1; i <= piece.moveDiagonalDistance; i++) {
      // Diagonal inferior esquerda
      if (position.x + i < this.size && position.y - i >= 0) {
        const pieceInWay = this.pieces[position.x + i][position.y - i];
        if (pieceInWay) {
          break;
        }
        moves.push({ x: position.x + i, y: position.y - i });
      }
    }
    // Diagonal inferior direita
    for (let i = 1; i <= piece.moveDiagonalDistance; i++) {
      if (position.x + i < this.size && position.y + i < this.size) {
        const pieceInWay = this.pieces[position.x + i][position.y + i];
        if (pieceInWay) {
          break;
        }
        moves.push({ x: position.x + i, y: position.y + i });
      }
    }

    // Movimentos especiais
    console.log(piece.specialMovePatterns);

    if (piece.specialMovePatterns && piece.specialMovePatterns.length > 0) {
      console.log('special moves');
      for (const pattern of piece.specialMovePatterns) {
        console.log(pattern);
        const newX = position.x + pattern.x;
        const newY = position.y + pattern.y;
        if (newX >= 0 && newX < this.size && newY >= 0 && newY < this.size) {
          const pieceInWay = this.pieces[newX][newY];
          if (!pieceInWay)
            moves.push({ x: newX, y: newY });
        }
      }
    }

    console.log(moves);

    // Remove movimentos que passam por cima de peças
    return moves.filter((move) => {
      const piece = this.pieces[move.x][move.y];
      return !piece || piece.color !== this.turn;
    });
  }

  movePiece (from: { x: number; y: number }, to: { x: number; y: number }): void {
    const piece = this.pieces[from.x][from.y];
    if (!piece) return;

    this.pieces[to.x][to.y] = piece;
    this.pieces[from.x][from.y] = null;
    // change turn
    this.turn = this.turn === ChessColor.White ? ChessColor.Black : ChessColor.White;
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
          isMovePossible: false
        });
      }
    }
    console.log(board);

    return board;
  }

  initializeBoardPieces (): ChessPiece[][] {
    const board: ChessPiece[][] = Array(8)
      .fill(null)
      .map(() => Array(8).fill(null));

    for (let i = 0; i < 8; i++) {
      board[i][1] = new Pawn({ color: ChessColor.Black });
      board[i][6] = new Pawn({ color: ChessColor.White });
    }

    board[0][0] = new Rook({ color: ChessColor.Black });
    board[1][0] = new Knight({ color: ChessColor.Black });
    board[2][0] = new Bishop({ color: ChessColor.Black });
    board[3][0] = new Queen({ color: ChessColor.Black });
    board[4][0] = new King({ color: ChessColor.Black });
    board[5][0] = new Bishop({ color: ChessColor.Black });
    board[6][0] = new Knight({ color: ChessColor.Black });
    board[7][0] = new Rook({ color: ChessColor.Black });

    board[0][7] = new Rook({ color: ChessColor.White });
    board[1][7] = new Knight({ color: ChessColor.White });
    board[2][7] = new Bishop({ color: ChessColor.White });
    board[3][7] = new Queen({ color: ChessColor.White });
    board[4][7] = new King({ color: ChessColor.White });
    board[5][7] = new Bishop({ color: ChessColor.White });
    board[6][7] = new Knight({ color: ChessColor.White });
    board[7][7] = new Rook({ color: ChessColor.White });
    console.log(board);

    return board;
  }
}

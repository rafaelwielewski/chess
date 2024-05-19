import { ChessPiece, ChessPieceParams } from './ChessPiece';
import { ChessColor } from './value_objects/ChessColor';
import { PiecesName } from './value_objects/PiecesTypes';

export class Pawn extends ChessPiece {
  constructor (params: { color: ChessColor; position: { x: number; y: number } }) {
    const imageUrl =
      params.color === ChessColor.White
        ? 'https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg'
        : 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg';
    super({
      name: PiecesName.Pawn,
      image: imageUrl,
      color: params.color,
      position: params.position,
      canJumpPieces: false
    });
  }

  getPossibleMoves (): { x: number; y: number }[] {
    const moves: { x: number; y: number }[] = [];
    if (this.color === ChessColor.White) {
      if (this.isFirstMove && this.position.y - 2 >= 0) {
        moves.push({ x: this.position.x, y: this.position.y - 2 });
      }
      if (this.position.y - 1 >= 0) {
        moves.push({ x: this.position.x, y: this.position.y - 1 });
      }
    } else {
      if (this.isFirstMove && this.position.y + 2 < this.boardSize.y) {
        moves.push({ x: this.position.x, y: this.position.y + 2 });
      }
      if (this.position.y + 1 < this.boardSize.y) {
        moves.push({ x: this.position.x, y: this.position.y + 1 });
      }
    }
    return moves;
  }

  getPossibleCapturesMoves (): { x: number; y: number }[] {
    const captures: { x: number; y: number }[] = [];
    if (this.color === ChessColor.White) {
      if (this.position.x - 1 >= 0 && this.position.y - 1 >= 0) {
        captures.push({ x: this.position.x - 1, y: this.position.y - 1 });
      }
      if (this.position.x + 1 < this.boardSize.x && this.position.y - 1 >= 0) {
        captures.push({ x: this.position.x + 1, y: this.position.y - 1 });
      }
    } else {
      if (this.position.x - 1 >= 0 && this.position.y + 1 < this.boardSize.y) {
        captures.push({ x: this.position.x - 1, y: this.position.y + 1 });
      }
      if (this.position.x + 1 < this.boardSize.x && this.position.y + 1 < this.boardSize.y) {
        captures.push({ x: this.position.x + 1, y: this.position.y + 1 });
      }
    }
    return captures;
  }
}

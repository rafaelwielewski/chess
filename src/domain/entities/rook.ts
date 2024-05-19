import { ChessPiece, ChessPieceParams } from './ChessPiece';
import { ChessColor } from './value_objects/ChessColor';
import { PiecesName } from './value_objects/PiecesTypes';

export class Rook extends ChessPiece {
  constructor (params: { color: ChessColor; position: { x: number; y: number } }) {
    const imageUrl =
      params.color === ChessColor.White
        ? 'https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg'
        : 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg';
    super({
      name: PiecesName.Rook,
      image: imageUrl,
      color: params.color,
      position: params.position,
      canJumpPieces: false
    });
  }

  getPossibleMoves (): { x: number; y: number }[] {
    const moves: { x: number; y: number }[] = [];
    for (let i = 1; i < this.boardSize.x; i++) {
      if (this.position.x + i < this.boardSize.x) {
        moves.push({ x: this.position.x + i, y: this.position.y });
      }
      if (this.position.x - i >= 0) {
        moves.push({ x: this.position.x - i, y: this.position.y });
      }
      if (this.position.y + i < this.boardSize.y) {
        moves.push({ x: this.position.x, y: this.position.y + i });
      }
      if (this.position.y - i >= 0) {
        moves.push({ x: this.position.x, y: this.position.y - i });
      }
    }
    return moves;
  }

  getPossibleCapturesMoves (): { x: number; y: number }[] {
    // For a rook, possible moves and possible captures are the same
    return this.getPossibleMoves();
  }
}

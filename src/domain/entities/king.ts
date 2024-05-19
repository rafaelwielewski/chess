import { ChessPiece, ChessPieceParams } from './ChessPiece';
import { ChessColor } from './value_objects/ChessColor';
import { PiecesName } from './value_objects/PiecesTypes';

export class King extends ChessPiece {
  constructor (params: { color: ChessColor; position: { x: number; y: number } }) {
    const imageUrl =
      params.color === ChessColor.White
        ? 'https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg'
        : 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg';
    super({
      name: PiecesName.King,
      image: imageUrl,
      color: params.color,
      position: params.position,
      canJumpPieces: false
    });
  }

  getPossibleMoves (): { x: number; y: number }[] {
    const moves: { x: number; y: number }[] = [];
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i !== 0 || j !== 0) {
          const newX = this.position.x + i;
          const newY = this.position.y + j;
          if (newX >= 0 && newX < this.boardSize.x && newY >= 0 && newY < this.boardSize.y) {
            moves.push({ x: newX, y: newY });
          }
        }
      }
    }
    return moves;
  }

  getPossibleCapturesMoves (): { x: number; y: number }[] {
    // For a king, possible moves and possible captures are the same
    return this.getPossibleMoves();
  }
}

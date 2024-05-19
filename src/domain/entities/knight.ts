import { ChessPiece, ChessPieceParams } from './ChessPiece';
import { ChessColor } from './value_objects/ChessColor';
import { PiecesName } from './value_objects/PiecesTypes';

export class Knight extends ChessPiece {
  constructor (params: { color: ChessColor; position: { x: number; y: number } }) {
    const imageUrl =
      params.color === ChessColor.White
        ? 'https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg'
        : 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg';
    super({
      name: PiecesName.Knight,
      image: imageUrl,
      color: params.color,
      position: params.position,
      canJumpPieces: true
    });
  }

  getPossibleMoves (): { x: number; y: number }[] {
    const moves: { x: number; y: number }[] = [];
    const movePatterns = [
      { x: 1, y: 2 },
      { x: 2, y: 1 },
      { x: 2, y: -1 },
      { x: 1, y: -2 },
      { x: -1, y: -2 },
      { x: -2, y: -1 },
      { x: -2, y: 1 },
      { x: -1, y: 2 }
    ];

    for (const pattern of movePatterns) {
      const newX = this.position.x + pattern.x;
      const newY = this.position.y + pattern.y;
      if (newX >= 0 && newX < this.boardSize.x && newY >= 0 && newY < this.boardSize.y) {
        moves.push({ x: newX, y: newY });
      }
    }
    return moves;
  }

  getPossibleCapturesMoves (): { x: number; y: number }[] {
    // For a knight, possible moves and possible captures are the same
    return this.getPossibleMoves();
  }
}

import { ChessPiece } from './ChessPiece';
import { ChessColor } from './value_objects/ChessColor';
import { PiecesName } from './value_objects/PiecesTypes';

export class Knight extends ChessPiece {
  constructor({ color }: { color: ChessColor }) {
    const imageUrl =
      color === ChessColor.White
        ? 'https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg'
        : 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg';
    super({
      name: PiecesName.Knight,
      image: imageUrl,
      color: color,
      firstMove: true,
      moveVerticalDistance: 0,
      moveHorizontalDistance: 0,
      canMoveDiagonally: false,
      canJumpOverPieces: true,
      canMoveTwoSpacesFromStart: false,
      canCaptureDiagonally: true,
      canMoveBackwards: true,
      canCaptureBackwards: true,
      specialMovePatterns: [
        { x: 1, y: 2 },
        { x: 2, y: 1 },
        { x: 2, y: -1 },
        { x: 1, y: -2 },
        { x: -1, y: -2 },
        { x: -2, y: -1 },
        { x: -2, y: 1 },
        { x: -1, y: 2 },
      ],
    });
  }
}

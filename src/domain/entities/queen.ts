import { ChessPiece } from './ChessPiece';
import { ChessColor } from './value_objects/ChessColor';
import { PiecesName } from './value_objects/PiecesTypes';

export class Queen extends ChessPiece {
  constructor({ color }: { color: ChessColor }) {
    const imageUrl =
      color === ChessColor.White
        ? 'https://upload.wikimedia.org/wikipedia/commons/4/49/Chess_qlt45.svg'
        : 'https://upload.wikimedia.org/wikipedia/commons/a/af/Chess_qdt45.svg';
    super({
      name: PiecesName.Queen,
      image: imageUrl,
      color: color,
      firstMove: true,
      moveVerticalDistance: 8,
      moveHorizontalDistance: 8,
      canMoveDiagonally: true,
      canJumpOverPieces: false,
      canMoveTwoSpacesFromStart: false,
      canCaptureDiagonally: true,
      canMoveBackwards: true,
      canCaptureBackwards: true,
    });
  }
}

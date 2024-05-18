import { ChessPiece } from './ChessPiece';
import { ChessColor } from './value_objects/ChessColor';
import { PiecesName } from './value_objects/PiecesTypes';

export class King extends ChessPiece {
  constructor ({ color }: { color: ChessColor }) {
    const imageUrl =
      color === ChessColor.White
        ? 'https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg'
        : 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg';
    super({
      name: PiecesName.King,
      image: imageUrl,
      color,
      firstMove: true,
      moveVerticalDistance: 1,
      moveHorizontalDistance: 1,
      moveDiagonalDistance: 1,
      canMoveDiagonally: true,
      canJumpOverPieces: false,
      canMoveTwoSpacesFromStart: false,
      canCaptureDiagonally: true,
      canMoveBackwards: true
    });
  }
}

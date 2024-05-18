import { ChessPiece } from './ChessPiece';
import { ChessColor } from './value_objects/ChessColor';
import { PiecesName } from './value_objects/PiecesTypes';

export class Pawn extends ChessPiece {
  constructor ({ color }: { color: ChessColor }) {
    const imageUrl =
      color === ChessColor.White
        ? 'https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg'
        : 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg';
    super({
      name: PiecesName.Pawn,
      image: imageUrl,
      color,
      firstMove: true,
      moveVerticalDistance: 1,
      moveHorizontalDistance: 0,
      moveDiagonalDistance: 0,
      canMoveDiagonally: false,
      canJumpOverPieces: false,
      canMoveTwoSpacesFromStart: true,
      canCaptureDiagonally: true,
      canMoveBackwards: false
    });
  }
}

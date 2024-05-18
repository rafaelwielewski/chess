import { ChessPiece } from './ChessPiece';
import { ChessColor } from './value_objects/ChessColor';
import { PiecesName } from './value_objects/PiecesTypes';

export class Bishop extends ChessPiece {
  constructor ({ color }: { color: ChessColor }) {
    const imageUrl =
      color === ChessColor.White
        ? 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg'
        : 'https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg';
    super({
      name: PiecesName.Bishop,
      image: imageUrl,
      color,
      firstMove: true,
      moveVerticalDistance: 0,
      moveHorizontalDistance: 0,
      moveDiagonalDistance: 8,
      canMoveDiagonally: true,
      canJumpOverPieces: false,
      canMoveTwoSpacesFromStart: false,
      canCaptureDiagonally: true,
      canMoveBackwards: true,
      specialMovePatterns: []
    });
  }
}

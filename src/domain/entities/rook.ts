import { ChessPiece } from './ChessPiece';
import { ChessColor } from './value_objects/ChessColor';
import { PiecesName } from './value_objects/PiecesTypes';

export class Rook extends ChessPiece {
  constructor({ color }: { color: ChessColor }) {
    const imageUrl =
      color === ChessColor.White
        ? 'https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg'
        : 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg';
    super({
      name: PiecesName.Rook,
      image: imageUrl,
      color: color,
      firstMove: true,
      moveVerticalDistance: 8,
      moveHorizontalDistance: 8,
      canMoveDiagonally: false,
      canJumpOverPieces: false,
      canMoveTwoSpacesFromStart: false,
      canCaptureDiagonally: false,
      canMoveBackwards: true,
      canCaptureBackwards: true,
    });
  }
}

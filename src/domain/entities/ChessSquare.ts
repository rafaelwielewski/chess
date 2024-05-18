import type { ChessColor } from './value_objects/ChessColor';

interface ChessSquareArgs {
  color: ChessColor;
  isSelected: boolean;
  isMovePossible: boolean;
}

export class ChessSquare {
  color: ChessColor;
  isSelected: boolean;
  isMovePossible: boolean;

  constructor (args: ChessSquareArgs) {
    const { color, isSelected, isMovePossible } = args;
    this.color = color;
    this.isSelected = isSelected;
    this.isMovePossible = isMovePossible;
  }
}

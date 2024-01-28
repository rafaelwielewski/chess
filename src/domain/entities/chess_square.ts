import type { ChessColor } from "./value_objects/chess_color";

export interface ChessSquare {
    color: ChessColor;
    isSelected: boolean;
    isMovePossible: boolean;
}

export class ChessSquare {
    constructor(args: ChessSquare) {
        const { color, isSelected, isMovePossible } = args;
        this.color = color;
        this.isSelected = isSelected;
        this.isMovePossible = isMovePossible;
    }
}
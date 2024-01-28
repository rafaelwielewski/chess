import { ChessPiece, type ChessPieceI } from "./chess_piece";
import { ChessColor } from "./value_objects/chess_color";
import type { ChessPosition } from "./value_objects/chess_position";
import { PiecesName } from "./value_objects/pieces_types";

export class Bishop extends ChessPiece {
    constructor(args: ChessPieceI) {
        const { color, position } = args;
        const imageUrl = color === ChessColor.White
            ? "https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg"
            : "https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg";
        super(
            PiecesName.Bishop,
            imageUrl,
            color,
            true,
            position,
        );
    }

    getPossibleMoves(): ChessPosition[] {
        const moves: ChessPosition[] = [];
        const { x, y } = this.position;
        for (let i = 0; i < 8; i++) {
            moves.push({ x: x + i, y: y + i });
            moves.push({ x: x - i, y: y - i });
            moves.push({ x: x + i, y: y - i });
            moves.push({ x: x - i, y: y + i });
        }
        return moves;
    }
}

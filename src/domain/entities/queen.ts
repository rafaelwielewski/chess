import { ChessPiece, type ChessPieceI } from "./chess_piece";
import { ChessColor } from "./value_objects/chess_color";
import type { ChessPosition } from "./value_objects/chess_position";
import { PiecesName } from "./value_objects/pieces_types";

export class Queen extends ChessPiece {
    constructor(args: ChessPieceI) {
        const { color, position } = args;
        const imageUrl = color === ChessColor.White
            ? "https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg"
            : "https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg";
        super(
            PiecesName.Queen,
            imageUrl,
            color,
            true,
            position,
        );
    }

    getPossibleMoves(): ChessPosition[] {
        const moves: ChessPosition[] = [];
        const { x, y } = this.position;
        for (let i = 1; i < 8; i++) {
            moves.push({ x: x + i, y: y + i });
            moves.push({ x: x - i, y: y - i });
            moves.push({ x: x + i, y: y - i });
            moves.push({ x: x - i, y: y + i });
            moves.push({ x: x + i, y });
            moves.push({ x: x - i, y });
            moves.push({ x, y: y + i });
            moves.push({ x, y: y - i });
        }
        return moves;
    }
}

import { ChessPiece, type ChessPieceI } from "./chess_piece";
import { ChessColor } from "./value_objects/chess_color";
import type { ChessPosition } from "./value_objects/chess_position";
import { PiecesName } from "./value_objects/pieces_types";

export class Pawn extends ChessPiece {
    constructor(args: ChessPieceI) {
        const { color, position } = args;
        const imageUrl = color === ChessColor.White
            ? "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg" // URL da imagem do peão branco
            : "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg"; // URL da imagem do peão preto
        super(
            PiecesName.Pawn,
            imageUrl,
            color,
            true,
            position,
        );
    }

    getPossibleMoves(): ChessPosition[] {
        const moves: ChessPosition[] = [];
        const { x, y } = this.position;
        if (this.color === ChessColor.White) {
            moves.push({ x: x - 1, y });
            if (this.firstMove) moves.push({ x: x - 2, y });
        } else {
            moves.push({ x: x + 1, y });
            if (this.firstMove) moves.push({ x: x + 2, y });
        }
        return moves;
    }
}

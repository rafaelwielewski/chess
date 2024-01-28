import { ChessPiece, type ChessPieceI } from "./chess_piece";
import { ChessColor } from "./value_objects/chess_color";
import type { ChessPosition } from "./value_objects/chess_position";
import { PiecesName } from "./value_objects/pieces_types";

export class Rook extends ChessPiece {
    constructor(args: ChessPieceI) {
        const { color, position } = args;
        const imageUrl = color === ChessColor.White
            ? "https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg" // URL da imagem do peão branco
            : "https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg"; // URL da imagem do peão preto
        super(
            PiecesName.Rook,
            imageUrl,
            color,
            true,
            position,
        );
    }

    getPossibleMoves(): ChessPosition[] {
        console.log(this.position);
        const moves: ChessPosition[] = [];
        const { x, y } = this.position;
        for (let i = 0; i < 8; i++) {
            if (i !== x) moves.push({ x: i, y });
            if (i !== y) moves.push({ x, y: i });
        }
        return moves;
    }
}

import type { ChessPiece } from "./chess_piece";
import { Pawn } from "./pawn";
import { Rook } from "./rook";
import { Bishop } from "./bishop";
import { Knight } from "./knight";
import { Queen } from "./queen";
import { King } from "./king";
import { ChessColor } from "./value_objects/chess_color";
import { ChessSquare } from "./chess_square";

export class ChessBoard {
    public readonly size: number = 8;
    // public readonly turn: ChessColor = ChessColor.White;
    // public readonly check: boolean = false;
    // public readonly checkMate: boolean = false;
    // public readonly staleMate: boolean = false;
    public squares: ChessSquare[][] = this.initializeBoardSquares();
    public board: ChessPiece[][] = this.initializeBoardPieces();
    constructor(
    ) { }

    initializeBoardSquares(): ChessSquare[][] {
        const board: ChessSquare[][] = Array(8).fill(null).map(() => Array(8).fill(null));

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const color = (i + j) % 2 === 0 ? ChessColor.White : ChessColor.Black;
                board[i][j] = new ChessSquare({ color, isSelected: false, isMovePossible: false });
            }
        }

        return board;
    }

    initializeBoardPieces(): ChessPiece[][] {
        const board: ChessPiece[][] = Array(8).fill(null).map(() => Array(8).fill(null));

        // Initialize pawns
        for (let i = 0; i < 8; i++) {
            board[1][i] = new Pawn({ position: { x: 1, y: i }, color: ChessColor.Black });
            board[6][i] = new Pawn({ position: { x: 6, y: i }, color: ChessColor.White });
        }

        board[0][0] = new Rook({ position: { x: 0, y: 0 }, color: ChessColor.Black });
        board[0][7] = new Rook({ position: { x: 0, y: 7 }, color: ChessColor.Black });

        board[7][0] = new Rook({ position: { x: 7, y: 0 }, color: ChessColor.White });
        board[7][7] = new Rook({ position: { x: 7, y: 7 }, color: ChessColor.White });

        board[0][1] = new Knight({ position: { x: 0, y: 1 }, color: ChessColor.Black });
        board[0][6] = new Knight({ position: { x: 0, y: 6 }, color: ChessColor.Black });

        board[7][1] = new Knight({ position: { x: 7, y: 1 }, color: ChessColor.White });
        board[7][6] = new Knight({ position: { x: 7, y: 6 }, color: ChessColor.White });

        board[0][2] = new Bishop({ position: { x: 0, y: 2 }, color: ChessColor.Black });
        board[0][5] = new Bishop({ position: { x: 0, y: 5 }, color: ChessColor.Black });

        board[7][2] = new Bishop({ position: { x: 7, y: 2 }, color: ChessColor.White });
        board[7][5] = new Bishop({ position: { x: 7, y: 5 }, color: ChessColor.White });

        board[0][3] = new Queen({ position: { x: 0, y: 3 }, color: ChessColor.Black });

        board[7][3] = new Queen({ position: { x: 7, y: 3 }, color: ChessColor.White });

        board[0][4] = new King({ position: { x: 0, y: 4 }, color: ChessColor.Black });

        board[7][4] = new King({ position: { x: 7, y: 4 }, color: ChessColor.White });

        return board;

    }
}
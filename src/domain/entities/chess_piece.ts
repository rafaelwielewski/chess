import type { ChessPosition } from "./value_objects/chess_position";
import { PiecesName } from "./value_objects/pieces_types";

export interface ChessPieceI {
    name?: PiecesName;
    image?: string;
    color: Number;
    firstMove?: boolean;
    position: ChessPosition;
}


export abstract class ChessPiece {
    constructor(
        public readonly name: PiecesName,
        public readonly image: string,
        public color: Number,
        public firstMove: boolean,
        public position: ChessPosition,
    ) {
    }


    getPieceName(piece: PiecesName): string {
        return PiecesName[piece];
    }

    getPieceImage(): string {
        return this.image;
    }

    getPieceColor(): Number {
        return this.color;
    }

    getPiecePosition(): ChessPosition {
        return this.position;
    }

    setPieceColor(color: Number): void {
        this.color = color;
    }

    abstract getPossibleMoves(): ChessPosition[];


    movePiece(position: ChessPosition): void {
        console.log(this.position);
        if (this.firstMove === true) this.firstMove = false;
        this.position = position;
        console.log(this.position);
    }

}



import { ChessBoard } from '@/domain/entities/chess_board';
import { ChessPosition } from '@/domain/entities/value_objects/chess_position';
import { ref } from 'vue';

export function useChess() {

    //chess board entity reactive
    const chessBoard = ref(new ChessBoard());
    let isSelected = false;
    let selectedPosition: ChessPosition = { x: -1, y: -1 };


    const handleClick = (x: number, y: number) => {
        //if square dont have piece, return
        // if (!chessBoard.value.board[x][y] && !chessBoard.value.square[x][y].isMovePossible) return;

        console.log(chessBoard.value.board);
        if (isSelected && chessBoard.value.squares[x][y].isMovePossible) {
            console.log("movePiece");
            chessBoard.value.board[selectedPosition.x][selectedPosition.y].movePiece({ x, y });
            isSelected = false;
            selectedPosition = { x: -1, y: -1 };
            console.log(chessBoard.value.board);

            return;
        }

        const square = { ...chessBoard.value.squares[x][y] };

        chessBoard.value.squares.forEach(e => {
            e.forEach(e => {
                e.isSelected = false;
                e.isMovePossible = false;
            });
        });


        if (square.isSelected) return isSelected = false;

        chessBoard.value.squares[x][y].isSelected = true;
        isSelected = true;
        selectedPosition = { x, y };

        const piece = chessBoard.value.board[x][y];
        const possibleMoves = piece?.getPossibleMoves();
        possibleMoves.forEach(e => {
            chessBoard.value.squares[e.x][e.y].isMovePossible = true;
        });


    }

    return {
        chessBoard,
        handleClick
    };
}

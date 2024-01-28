import { ChessBoard } from '@/domain/entities/ChessBoard';
import { ref } from 'vue';

export function useChess() {
  //chess board entity reactive
  const chessBoard = ref(new ChessBoard());
  // let isSelected = false;
  // let selectedPosition: ChessPosition | null = null;

  const handleClick = (x: number, y: number) => {
    console.log(x, y);
    const possibleMoves = chessBoard.value.getPossibleMoves({ x, y });
    possibleMoves.forEach((e) => {
      chessBoard.value.squares[e.x][e.y].isMovePossible = true;
    });

    console.log(possibleMoves);
  };

  return {
    chessBoard,
    handleClick,
  };
}

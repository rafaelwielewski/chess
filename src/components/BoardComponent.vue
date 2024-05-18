<script setup lang="ts">
import { useChessBoardStore } from 'src/stores/chessBoard';
import BoardSquare from './BoardSquareComponent.vue';
import { useGameStore } from 'src/stores/game';

const chessBoard = useChessBoardStore();
const game = useGameStore();

</script>

<template>
  <div class="board_wrapper">
    <div class="board">
      <div class="board">
        <div class="board_row" v-for="(row, i) in chessBoard.chessBoard.squares" :key="`row-${i}`">
          <BoardSquare v-for="(column, j) in row" :square="chessBoard.chessBoard.squares[j][i]"
            :piece="chessBoard.chessBoard.pieces[j][i]" :key="`square-${i}-${j}`"
            @click=" chessBoard.handleClick(j, i)" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.board_wrapper {
  background-color: rgb(75, 75, 75);
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.board {
  border: 1px solid black;
  box-sizing: border-box;
}

.board_row {
  display: flex;
  flex-direction: row;
}
</style>

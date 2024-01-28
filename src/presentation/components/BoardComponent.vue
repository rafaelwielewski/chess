<script setup lang="ts">
  import BoardSquare from './BoardSquareComponent.vue';
  import { useChess } from '../hooks/useChess';

  const { chessBoard, handleClick } = useChess();
</script>

<template>
  <div class="board_wrapper">
    <div class="board">
      <div class="board_row" v-for="(column, y) in chessBoard.squares" :key="`column-${y}`">
        <BoardSquare v-for="(row, x) in column" :key="`row-${y}-${x}`" :square="row" :piece="chessBoard.pieces[y][x]" @click="handleClick(x, y)" />
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
@/domain/entities/value_objects/ChessColor

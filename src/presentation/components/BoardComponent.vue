<script setup lang="ts">
import BoardSquare from './BoardSquareComponent.vue';
import { useChess } from '../hooks/useChess';
import { ChessColor } from '@/domain/entities/value_objects/chess_color';

const { chessBoard, handleClick } = useChess();
</script>

<template>
    <div class="board_wrapper">
        <div class="board">
            <div class="board_row" v-for="(row, i) in chessBoard.squares" :key="`row-${i}`">
                <BoardSquare v-for="(square, j) in row" :square="square" :piece="chessBoard.board[i][j]"
                    :key="`square-${i}-${j}`" @click="handleClick(i, j)" />
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
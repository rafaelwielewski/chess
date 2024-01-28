<script setup lang="ts">
import type { ChessPiece } from '@/domain/entities/chess_piece';
import type { ChessSquare } from '@/domain/entities/chess_square';
import { ChessColor } from '@/domain/entities/value_objects/chess_color';

const props = defineProps({
    square: Object as () => ChessSquare | null,
    piece: Object as () => ChessPiece | null,
})
</script>

<template>
    <div class="board_square" :class="{
        white: square?.color === ChessColor.White,
        black: square?.color === ChessColor.Black,
        selected: square?.isSelected,
        possibleMove: square?.isMovePossible
    }">
        <div v-if="piece">
            <img :src="piece.image" />
        </div>
    </div>
</template>

<style scoped>
.board_square {
    width: 10vh;
    height: 10vh;
    border: 1px solid black;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
}

.white {
    background-color: #90ee90;
    /* light green */
}

.black {
    background-color: #006400;
    /* dark green */
}

.selected,
.possibleMove {
    background-color: rgba(255, 255, 0, 0.5);
    /* semi-transparent yellow */
}
</style>
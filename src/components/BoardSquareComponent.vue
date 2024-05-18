<script setup lang="ts">
import { ChessPiece } from 'src/domain/entities/ChessPiece';
import { ChessSquare } from 'src/domain/entities/ChessSquare';
import { ChessColor } from 'src/domain/entities/value_objects/ChessColor';

const props = defineProps({
  square: Object as () => ChessSquare | null,
  piece: Object as () => ChessPiece | null
});
</script>

<template>
  <div class="board_square" :class="{
    white: square?.color === ChessColor.White,
    black: square?.color === ChessColor.Black,
    selected: square?.isSelected,
  }">
    <div v-if="piece">
      <img :src="piece.image" />
    </div>
    <div v-if="square?.isMovePossible" class="possible-move-indicator"></div>
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
  position: relative;
}

.possible-move-indicator {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  /* Centraliza a bolinha no quadrado */
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

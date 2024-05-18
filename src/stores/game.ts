import { defineStore } from 'pinia';
import { ChessColor } from 'src/domain/entities/value_objects/ChessColor';

export const useGameStore = defineStore({
  id: 'game',
  state: () => ({
    turn: ChessColor.White,
    check: false,
    checkMate: false,
    staleMate: false
  }),
  actions: {
    changeTurn () {
      this.turn = this.turn === ChessColor.White ? ChessColor.Black : ChessColor.White;
    },
    setCheck (value: boolean) {
      this.check = value;
    },
    setCheckMate (value: boolean) {
      this.checkMate = value;
    },
    setStaleMate (value: boolean) {
      this.staleMate = value;
    }
  }
});

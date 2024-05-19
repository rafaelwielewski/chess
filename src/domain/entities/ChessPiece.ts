import { PiecesName } from './value_objects/PiecesTypes';

export interface ChessPieceParams {
  name: PiecesName;
  image: string;
  color: number;
  isFirstMove?: boolean;
  canJumpPieces: boolean;
  position: { x: number; y: number };
  boardSize?: { x: number; y: number };
}

export abstract class ChessPiece {
  constructor (params: ChessPieceParams) {
    this.name = params.name;
    this.image = params.image;
    this.color = params.color;
    this.isFirstMove = params.isFirstMove || true;
    this.canJumpPieces = params.canJumpPieces || false;
    this.position = params.position;
    this.boardSize = params.boardSize || { x: 8, y: 8 };
  }

  public readonly name: PiecesName;
  public readonly image: string;
  public color: number;
  public isFirstMove: boolean;
  public canJumpPieces: boolean;
  public position: { x: number; y: number };
  public boardSize: { x: number; y: number };

  abstract getPossibleMoves (): { x: number; y: number }[];

  abstract getPossibleCapturesMoves (): { x: number; y: number }[];

  getPosition (): { x: number; y: number } {
    return this.position;
  }

  move (position: { x: number; y: number }): void {
    this.position = position;
    this.isFirstMove = false;
  }
}

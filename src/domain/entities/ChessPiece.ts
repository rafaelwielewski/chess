import { PiecesName } from './value_objects/PiecesTypes';

export interface ChessPieceParams {
  name: PiecesName;
  image: string;
  color: number;
  firstMove: boolean;
  moveVerticalDistance: number;
  moveHorizontalDistance: number;
  moveDiagonalDistance: number;
  canMoveDiagonally: boolean;
  canJumpOverPieces: boolean;
  canMoveTwoSpacesFromStart: boolean;
  canCaptureDiagonally: boolean;
  canMoveBackwards: boolean;
  specialMovePatterns: Array<{ x: number; y: number }>;
}

export abstract class ChessPiece {
  constructor (params: ChessPieceParams) {
    this.name = params.name;
    this.image = params.image;
    this.color = params.color;
    this.firstMove = params.firstMove;
    this.moveVerticalDistance = params.moveVerticalDistance;
    this.moveHorizontalDistance = params.moveHorizontalDistance;
    this.moveDiagonalDistance = params.moveDiagonalDistance;
    this.canMoveDiagonally = params.canMoveDiagonally;
    this.canJumpOverPieces = params.canJumpOverPieces;
    this.canMoveTwoSpacesFromStart = params.canMoveTwoSpacesFromStart;
    this.canCaptureDiagonally = params.canCaptureDiagonally;
    this.canMoveBackwards = params.canMoveBackwards;
    this.specialMovePatterns = params.specialMovePatterns;
  }

  public readonly name: PiecesName;
  public readonly image: string;
  public color: number;
  public firstMove: boolean;
  public moveVerticalDistance: number;
  public moveHorizontalDistance: number;
  public moveDiagonalDistance: number;
  public canMoveDiagonally: boolean;
  public canJumpOverPieces: boolean;
  public canMoveTwoSpacesFromStart: boolean;
  public canCaptureDiagonally: boolean;
  public canMoveBackwards: boolean;
  public specialMovePatterns: Array<{ x: number; y: number }>;
}

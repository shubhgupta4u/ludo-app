import { PlayerCode } from "./player";

type EventDataType = PlayerMoveStartedEventData | PlayerThrownDiceEventData |undefined

export enum EventName {
    PlayerMoveStarted,
    PlayerThrownDice,
}

export class GameEvent {
    data: EventDataType;
    name: EventName | undefined
    constructor(name: EventName, data: EventDataType = undefined) {
        this.name = name;
        this.data = data;
    }
}

export class PlayerThrownDiceEventData {
    playerCode: PlayerCode;
    diceNumber: number;
    constructor(playerCode: PlayerCode, diceNumber: number) {
        this.playerCode = playerCode;
        this.diceNumber = diceNumber;
    }
}

export class PlayerMoveStartedEventData extends PlayerThrownDiceEventData{
    token: number | undefined;
    constructor(playerCode: PlayerCode, diceNumber: number, token: number ) {
        super(playerCode, diceNumber);
        this.token = token;
    }
}
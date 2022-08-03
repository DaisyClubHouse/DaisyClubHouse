interface MsgPack {
  type: MsgType;
  payload: any;
}

export enum MsgType {
  CreateRoomRequest = 1,
  CreateRoomResponse = 2,
  JoinRoomRequest = 3,
  JoinRoomResponse = 4,
  PlaceThePieceRequest = 5,
  PlaceThePieceResponse = 6,

  BroadcastRoomGameBeginning = 100,
  BroadcastPlaceThePiece = 101,
}

interface CreateRoomRequest {
  room_title: string;
}

// 创建房间请求
export function createRoomRequest(title: string): string {
  const req: CreateRoomRequest = {
    room_title: title,
  };
  const msgPack: MsgPack = {
    type: MsgType.CreateRoomRequest,
    payload: req,
  };

  return JSON.stringify(msgPack);
}

interface JoinRoomRequest {
  short_code: string;
}

// 加入房间请求
export function joinRoomRequest(code: string): string {
  const req: JoinRoomRequest = {
    short_code: code,
  };
  const msgPack: MsgPack = {
    type: MsgType.JoinRoomRequest,
    payload: req,
  };
  return JSON.stringify(msgPack);
}

// 解析消息
export function decodeMsgPack(msg: string): MsgPack {
  return JSON.parse(msg);
}

interface PlaceThePieceRequest {
  x: number;
  y: number;
}

// 在指定位置放置棋子
export function placeThePieceRequest(x: number, y: number): string {
  const req: PlaceThePieceRequest = {
    x,
    y,
  };
  return JSON.stringify({
    type: MsgType.PlaceThePieceRequest,
    payload: req,
  });
}

interface PlayerPlaceThePieceMessage {
  room_id: string; // 房间id
  player_id: string; // 玩家id
  piece_white: boolean; // 是否是白棋
  x: number; // 棋子x坐标
  y: number; // 棋子y坐标
}

export type { PlayerPlaceThePieceMessage };

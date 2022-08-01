interface MsgPack {
  type: MsgType;
  payload: any;
}

enum MsgType {
  CreateRoomRequest = 1,
  CreateRoomResponse = 2,
  JoinRoomRequest = 3,
  JoinRoomResponse = 4,
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

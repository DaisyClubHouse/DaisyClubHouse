interface MsgPack {
  type: MsgType;
  msg: any;
}

enum MsgType {
  CreateRoomRequest = 1,
  CreateRoomResponse = 2,
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
    msg: req,
  };

  return JSON.stringify(msgPack);
}
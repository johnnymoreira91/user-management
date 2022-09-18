
declare namespace Express {
  export interface Request {
      id: string,
      operation: string,
      result: string,
      userId: string;
  }
  export interface Response {
    time: number
}
}

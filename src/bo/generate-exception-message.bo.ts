interface Request {
  id?: string;
  method?: string;
  url?: string;
  body?: JSON;
}

export interface GenerateExceptionMessageBO {
  appEnvironment: string;
  type: string;
  exception: any;
  request: Request;
}

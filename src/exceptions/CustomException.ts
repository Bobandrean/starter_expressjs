import {EXCEPTION_MESSAGE} from './EXCEPTION_MESSAGE';

type logFormat = {
  message: any;
  responseTime?: number;
  destination?: string;
};

export class CustomException {
  obj: any;
  systemLog: logFormat | undefined;
  constructor(
    obj: any = EXCEPTION_MESSAGE.PROCESSING_ERROR,
    systemLog?: logFormat,
  ) {
    this.obj = obj;
    this.systemLog = systemLog;
  }
}

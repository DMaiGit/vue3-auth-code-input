import { ComponentPublicInstance } from 'vue';

export interface ISmsCodeComponentInstance extends ComponentPublicInstance {
  resetSendButton: (newCountDown?: number) => void;
}

export type CodeProp = string | number;
export type LengthProp = number;

export interface SmsCodePropsType {
  width: CodeProp;
  height: CodeProp;
  code: CodeProp;
  codeHeight: CodeProp;
  length: LengthProp;
  type: 'text' | 'number';
  title: string;
  contentText?: string;
  card: boolean;
  borderColor: string;
  activeBorderColor: string;
  color: string;
  fontSize: CodeProp;
  customName: string;
  customItemName: string;
  sendText: string;
  sendBtnColor: string;
  sendCountDown: number;
  mobile: string;
}

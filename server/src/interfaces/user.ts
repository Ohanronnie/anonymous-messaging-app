export interface IUser {
  username: string;
  password: string;
  messages: [
    {
      message: string;
      time: number | Date;
    }
  ];
}
export interface IMethod extends IUser {
  isNew: boolean;
  isModified(value: string): boolean;
  save(): void;
}

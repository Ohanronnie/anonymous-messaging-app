export interface IUser {
  username: string;
  password: string;
  messages: [
    {
      message: string;
      time: number | Date;
    },
  ];
  coverPath: string;
}
export interface IMethod extends IUser {
  isNew: boolean;
  isModified(value: string): boolean;
  save(): void;
}

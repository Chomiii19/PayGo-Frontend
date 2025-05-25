interface IContact {
  name: string;
  contactNumber: string;
}

interface IUser {
  _id: number;
  name: string;
  accountNumber: string;
  email: string;
  checkingsBal: number;
  savingsBal: number;
  password: string;
  contacts: IContact[];
  profilePictureUrl: string;
  verificationCode: { code: String; expiresAt: Date };
}

export default IUser;

export interface CreateRegisterDTO {
  userId: string;
  username: string;
  email: string;
  walletAddress: string;
}

export interface RegisterResponseDTO {
  userId: string;
  result: boolean;
  msg: string;
}

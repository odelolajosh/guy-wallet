import { User } from "@/domain/user/model"

declare global {
  namespace Express {
    export interface Request {
      user?: User
    }
  }
}

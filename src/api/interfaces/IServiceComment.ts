import Comment from "../../database/models/CommentModel";
import IComment from "./IComment";

export default interface IServiceComments {
  create(dto: IComment): Promise<Comment>;
  readAll(): Promise<Comment[]>;
  readById(id: number): Promise<Comment>;
  update(id: number, dto: IComment): Promise<Comment>;
  delete(id: Number): Promise<void>;
}

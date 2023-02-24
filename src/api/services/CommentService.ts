import { ModelStatic } from "sequelize";
import Comment from "../../database/models/CommentModel";
import IComment from "../interfaces/IComment";
import IServiceComments from "../interfaces/IServiceComment";

export default class CommentService implements IServiceComments {
  protected model: ModelStatic<Comment> = Comment;

  async create(dto: IComment): Promise<Comment> {
    return await this.model.create({ ...dto });
  }

  async readAll(): Promise<Comment[]> {
    return await this.model.findAll();
  }

  async readById(id: number): Promise<Comment> {
    await this._verify(id);
    return (await this.model.findByPk(id)) as Comment;
  }

  async update(id: number, dto: IComment): Promise<Comment> {
    await this.model.update({ ...dto }, { where: { id } });
    return (await this.model.findByPk(id)) as Comment;
  }

  async delete(id: number): Promise<void> {
    await this._verify(id);
    await this.model.destroy({ where: { id } });
  }

  private async _verify(id: number): Promise<void> {
    const post = await this.model.findByPk(id);
    if (!post) throw new Error(`Id ${id} is null`);
  }
}

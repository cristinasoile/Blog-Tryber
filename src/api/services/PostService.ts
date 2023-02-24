import { ModelStatic } from "sequelize";
import Post from "../../database/models/PostModel";
import IPost from "../interfaces/IPost";
import IServicePost from "../interfaces/IServicePost";

export default class PostService implements IServicePost {
  protected model: ModelStatic<Post> = Post;

  async create(dto: IPost): Promise<Post> {
    return await this.model.create({ ...dto });
  }

  async readAll(): Promise<Post[]> {
    return await this.model.findAll();
  }
  // findOne - pode achar por where
  // findByPk - primarykey    
  async readById(id: number): Promise<Post> {
    await this._verify(id);
    return (await this.model.findByPk(id)) as Post;
  }

  async update(id: number, dto: IPost): Promise<Post> {
    await this.model.update({ ...dto }, { where: { id } });
    return (await this.model.findByPk(id)) as Post;
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

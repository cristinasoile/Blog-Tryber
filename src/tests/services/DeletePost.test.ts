import { expect } from "chai";
import { Model } from "sequelize";
import Sinon from "sinon";
import PostService from "../../api/services/PostService";
import Post from "../../database/models/PostModel";

describe("Testes de serviço: DELETE", function () {
  afterEach(function () {
    Sinon.restore();
  });

  it("Caso 1: Deve retornar um ID DELETE", async function () {
    const id = 1;
    const outputMock: Post = new Post({
      id: 1,
      title: "Typescript ID excluído",
      content: "Typescript foi excluído",
    });

    // when
    Sinon.stub(Model, "findByPk").resolves(outputMock);
    Sinon.stub(Model, "destroy").resolves();
    const service = new PostService();
    const result = await service.delete(id);

    // then
    expect(result).to.be.undefined;
  });

  it("Caso 2: Deve retornar um ID DELETE", async function () {
    const id = 1;

    const outputMock: string = `Id ${id} is null`;

    const service = new PostService();
    try {
      await service.delete(id);
    } catch (error) {
      if (error instanceof Error) expect(error.message).to.equal(outputMock);
    }
  });
});

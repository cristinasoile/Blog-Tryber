import { expect } from "chai";
import { Model } from "sequelize";
import Sinon from "sinon";
import IPost from "../../api/interfaces/IPost";
import PostService from "../../api/services/PostService";
import Post from "../../database/models/PostModel";

describe("Testes de serviço: Update", function () {
  afterEach(function () {
    Sinon.restore();
  });

  it("Caso 1: Deve retornar um Update", async function () {
    const id = 1;
    const inputMock: IPost = {
      title: "Typescript atualizado",
      content: "Typescript é uma boa ferramenta para ajudar no POO",
    };
    const outputMock: Post = new Post({
      id: 1,
      title: "Typescript atualizado",
      content: "Typescript é uma boa ferramenta para ajudar no POO",
    });

    // when
    Sinon.stub(Model, "update").resolves();
    Sinon.stub(Model, "findByPk").resolves(outputMock);
    const service = new PostService();
    await service.update(id, inputMock);

    const result = await service.readById(id);
    expect(result).to.be.equal(outputMock);
  });
  it("Caso 2: Deve retornar uma exeção Update", async function () {
    const id = 666;
    const inputMock: IPost = {
      title: "Typescript errado",
      content: "Deu erro!!",
    };
    const outputMock: Post = new Post({
      title: `Id ${id} is null`,
    });

    const service = new PostService();
    try {
      const teste = await service.update(id, inputMock);
      console.log("====>", teste);
    } catch (error) {
      if (error instanceof Error) expect(error.message).to.equal(outputMock);
    }
  });
});

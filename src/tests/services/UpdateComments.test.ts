import { expect } from "chai";
import { Model } from "sequelize";
import Sinon from "sinon";
import IComment from "../../api/interfaces/IComment";
import CommentService from "../../api/services/CommentService";
import Comment from "../../database/models/CommentModel";

describe("Testes de serviço: Update", function () {
  afterEach(function () {
    Sinon.restore();
  });

  it("Caso 1: Deve retornar um Update Comments", async function () {
    const id = 1;
    const inputMock: IComment = {
      content: "Typescript é uma boa ferramenta para ajudar no POO",
      postId: "teste",
    };
    const outputMock: Comment = new Comment({
      id: 1,
      content: "Typescript é uma boa ferramenta para ajudar no POO",
      postId: "teste",
    });

    // when
    Sinon.stub(Model, "update").resolves();
    Sinon.stub(Model, "findByPk").resolves(outputMock);
    const service = new CommentService();
    await service.update(id, inputMock);

    const result = await service.readById(id);
    expect(result).to.be.equal(outputMock);
  });
  it("Caso 2: Deve retornar uma exeção Update Comments", async function () {
    const id = 1;
    const inputMock: IComment = {
      content: "Deu erro!!",
      postId: "Typescript errado",
    };
    const outputMock: Comment = new Comment({
      content: `Id ${id} is null`,
    });

    const service = new CommentService();
    try {
      const teste = await service.update(id, inputMock);
      console.log("====>", teste);
    } catch (error) {
      if (error instanceof Error) expect(error.message).to.equal(outputMock);
    }
  });
});

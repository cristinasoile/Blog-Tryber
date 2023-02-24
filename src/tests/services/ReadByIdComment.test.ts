import { expect } from "chai";
import { Model } from "sequelize";
import Sinon from "sinon";
import IComment from "../../api/interfaces/IComment";
import CommentService from "../../api/services/CommentService";
import Comment from "../../database/models/CommentModel";

describe("Testes de serviço: Read By Id", function () {
  afterEach(function () {
    Sinon.restore();
  });

  it("Caso 1: Deve retornar um Id do Post", async function () {
    //given
    const id = 1;
    const outputMock: Comment = new Comment({
      id: 1,
      content: "Typescript é uma boa ferramenta para ajudar no POO",
      postId: "teste",
    });

    // when
    Sinon.stub(Model, "findByPk").resolves(outputMock);
    const service = new CommentService();
    const result = await service.readById(id);

    // then
    expect(result).to.be.equal(outputMock);
  });
});

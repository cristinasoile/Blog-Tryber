import { expect } from "chai";
import { Model } from "sequelize";
import Sinon from "sinon";
import IComment from "../../api/interfaces/IComment";
import CommentService from "../../api/services/CommentService";
import Comment from "../../database/models/CommentModel";

describe("Testes de serviço: Create Post", function () {
  afterEach(function () {
    Sinon.restore();
  });

  it("Caso 1: Deve criar um novo Comment", async function () {
    const inputMock: IComment = {
      content: "Typescript é uma boa ferramenta para ajudar no POO",
      postId: "Typescript na pratica",
    };
    const outputMock: Comment = new Comment({
      id: 1,
      content: "Typescript é uma boa ferramenta para ajudar no POO",
      postId: "Typescript na pratica",
    });

    // when

    Sinon.stub(Model, "create").resolves(outputMock);
    const service = new CommentService();
    const result = await service.create(inputMock);

    // then
    expect(result).to.be.equal(outputMock);
  });
});

import { expect } from "chai";
import { Model } from "sequelize";
import Sinon from "sinon";
import IPost from "../../api/interfaces/IPost";
import PostService from "../../api/services/PostService";
import Post from "../../database/models/PostModel";

describe("Testes de serviço: Create Post", function () {
  afterEach(function () {
    Sinon.restore();
  });

  it("Caso 1: Deve criar um noo Post", async function () {
    const inputMock: IPost = {
      title: "Typescript na pratica",
      content: "Typescript é uma boa ferramenta para ajudar no POO",
    };
    const outputMock: Post = new Post({
      id: 1,
      title: "Typescript na pratica",
      content: "Typescript é uma boa ferramenta para ajudar no POO",
    });

    // when

    Sinon.stub(Model, "create").resolves(outputMock);
    const service = new PostService();
    const result = await service.create(inputMock);

    // then
    expect(result).to.be.equal(outputMock);
  });
});

import { expect } from "chai";
import { Model } from "sequelize";
import Sinon from "sinon";
import PostService from "../../../api/services/PostService";
import Post from "../../../database/models/PostModel";

describe("Testes de serviço: Read ById", function () {
  afterEach(function () {
    Sinon.restore();
  });

  it("Caso 1: Deve retornar um Id do Post", async function () {
    //given
    const id = 1;
    const outputMock: Post = new Post({
      id: 1,
      title: "Typescript na pratica",
      content: "Typescript é uma boa ferramenta para ajudar no POO",
    });

    // when
    Sinon.stub(Model, "findByPk").resolves(outputMock);
    const service = new PostService();
    const result = await service.readById(id);

    // then
    expect(result).to.be.equal(outputMock);
  });
});

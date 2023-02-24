import { expect } from "chai";
import { Model } from "sequelize";
import Sinon from "sinon";
import PostService from "../../../api/services/PostService";
import Post from "../../../database/models/PostModel";

describe("Testes de serviço: Read all Post", function () {
  afterEach(function () {
    Sinon.restore();
  });

  it("Caso 1: Deve ler uma lista com 1 Post", async function () {
    //given
    const outputMock: Post[] = [
      new Post({
        id: 1,
        title: "Typescript na pratica",
        content: "Typescript é uma boa ferramenta para ajudar no POO",
      }),
    ];

    // when
    Sinon.stub(Model, "findAll").resolves(outputMock);
    const service = new PostService();
    const result = await service.readAll();

    // then
    expect(result).to.be.equal(outputMock);
    expect(result.length).to.be.equal(1);
  });
});

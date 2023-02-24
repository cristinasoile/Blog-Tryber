import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { Model } from "sequelize";
import Sinon from "sinon";
import IPost from "../../api/interfaces/IPost";
import App from "../../App";
import Post from "../../database/models/PostModel";

chai.use(chaiHttp);

describe(" ==== Testes para rota post ===", () => {
  const app = new App();

  afterEach(() => {
    Sinon.restore();
  });

  it("Deve cadastrar um post com sucesso", async () => {
    // arrange
    const post = {
      title: "Post teste",
      content: "Meu primeiro post",
    };
    // action
    const response = await chai.request(app.app).post("/post").send(post);

    // assertion
    expect(response.status).to.be.equal(201);
  });

  it("Deve cadastrar um post com sucesso e retornar o objeto criado", async () => {
    // arrange
    const inputMock: IPost = {
      title: "Typescript na pratica",
      content: "Typescript é uma boa ferramenta para ajudar no POO",
    };
    const outputMock: Post = {
      id: 1,
      title: "Typescript na pratica",
      content: "Typescript é uma boa ferramenta para ajudar no POO",
    } as Post;

    // when

    Sinon.stub(Model, "create").resolves(outputMock);
    // action
    const response = await chai.request(app.app).post("/post").send(inputMock);

    // assertion
    expect(response.body).to.be.deep.equal(outputMock);
  });

  it(" === Deve retornar 404, quando o id não existir ===", async () => {
    // arrange

    // when

    Sinon.stub(Model, "findByPk").resolves(null);
    // action
    const response = await chai.request(app.app).get("/post/1");

    // assertion
    expect(response.status).to.be.equal(404);
  });
  it(" === Deve retornar 200, quando for get ===", async () => {
    const outputMock: Post = {
      id: 1,
      title: "Typescript na pratica",
      content: "Typescript é uma boa ferramenta para ajudar no POO",
    } as Post;

    Sinon.stub(Model, "findByPk").resolves(outputMock);
    // action
    const response = await chai.request(app.app).get("/post/1");

    // assertion
    expect(response.status).to.be.equal(200);
  });
});

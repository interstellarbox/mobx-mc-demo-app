import { Model } from "mobx-mc";

//define a DogModel class
export default class DogModel extends Model {
  //define model's fields
  get restAttributes() {
    return ["id", "name", "img"];
  }
}

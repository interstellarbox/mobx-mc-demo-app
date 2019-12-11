import { Collection } from "mobx-mc";
import DogModel from "./DogModel";

//define a DogCollection class
export default class DogCollection extends Collection {
  //define a model for this collection
  model() {
    return DogModel;
  }
  //define an endpoint for this collection
  url() {
    return "https://g3sn7.sse.codesandbox.io/dogs";
  }
}

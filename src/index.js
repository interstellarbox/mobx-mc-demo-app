//libraries
import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";
import { observer } from "mobx-react";

// components
import { Divider, Card, Icon, Empty, List, Button, Popover, Spin } from "antd";
import "antd/dist/antd.css";
import Header from "./components/Header";
import Wrapper from "./components/Wrapper";
import FlexBox from "./components/FlexBox";
import DogModalForm from "./components/DogModalForm";

import DogCollection from "./DogCollection";

//Create a dog collection
const dogCollection = new DogCollection();

const App = observer(() => {
  const getDataForDogCollection = () => {
    //this will send a GET request to an url defined in the DogCollection class. In this example it will be - api/dogs
    dogCollection.fetch();
  };

  const addNewDogToCollection = data => {
    /* instantiating a model with new data, saving the model to the server, 
and adding the model to the collection after being successfully created 
Returns a promise that resolves with the newly created model*/

    dogCollection
      .create(data, {
        wait: true // wait for the server to respond before adding the model's into the local collection
      })
      .then(() => handleCancelForm())
      .catch(err => console.log(err));
  };

  const changeDogName = (values, model) => {
    /*send a PATCH request with new values to an url/<modelID> defined at the DogCollection class
  Returns a promise that resolves with the updated model*/

    model
      .save(values, {
        wait: true // wait for the server to respond before updating the model's attributes. The default for this option is false which performs an optimistic update.
      })
      .then(() => handleCancelForm())
      .catch(err => console.log(err));
  };

  const removeDogFromCollection = model => {
    //this will send a DELETE request to a url/<modelID> defined at the DogCollection class
    model.destroy();
  };

  const [isVisible, showModal] = useState(false);
  const [modelForEdit, setModelForEdit] = useState(null);
  const [dogFormRef, setDogFormRef] = useState(null);

  const assignRef = useCallback(node => {
    if (node !== null) {
      setDogFormRef(node);
    } else {
      setDogFormRef(null);
    }
  }, []);

  const handleCancelForm = () => {
    dogFormRef.resetFields();
    showModal(false);
    setModelForEdit(null);
  };

  const handleSubmitForm = () => {
    dogFormRef.validateFields((err, values) => {
      if (err) {
        return;
      }
      if (modelForEdit) {
        changeDogName(values, modelForEdit);
      } else {
        addNewDogToCollection(values);
      }
    });
  };

  return (
    <>
      <Header title="mobx-mc" subTitle="Demo app" />
      <Wrapper>
        {dogCollection.hasModels ? ( //hasModels -> a computed property to check that collection is not empty
          <>
            <Divider>{`Dog Collection (${dogCollection.length})`}</Divider>
            <List
              grid={{
                gutter: 16,
                xs: 3,
                md: 3
              }}
              dataSource={dogCollection.models}
              renderItem={model => {
                return (
                  <List.Item>
                    <Card
                      title={model.name}
                      cover={<img alt="modelImage" src={model.img} />}
                      actions={[
                        <Icon
                          type="edit"
                          key="edit"
                          onClick={() => {
                            setModelForEdit(model);
                            showModal(true);
                          }}
                        />,
                        <Popover
                          content={`Sends an DELETE request to the model's URL. 
                                    If the request is successful it also removes the model 
                                    from the collection it belongs to.`}
                          title="model.destroy()"
                          placement="bottom"
                        >
                          <Icon
                            type="delete"
                            key="delete"
                            onClick={() => removeDogFromCollection(model)}
                          />
                        </Popover>
                      ]}
                      hoverable
                    />
                  </List.Item>
                );
              }}
            />
            <FlexBox>
              <Popover
                content={`Instantiating a model with new data, saving the model to the server, 
                      and adding the model to the collection after being successfully created.`}
                title="collection.create()"
                placement="bottom"
              >
                <Button onClick={() => showModal(true)} type="primary">
                  {"Add a new model"}
                </Button>
              </Popover>
            </FlexBox>
            <DogModalForm
              ref={assignRef}
              model={modelForEdit}
              visible={isVisible}
              onSubmit={handleSubmitForm}
              onCancel={handleCancelForm}
            />
          </>
        ) : (
          <FlexBox flexDirection="column">
            <FlexBox minHeight="150px">
              {dogCollection.fetching ? ( //observable property for checking if a collection is fetching data
                <Spin tip="Fetching..." />
              ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              )}
            </FlexBox>
            <Popover
              content={`Fetch a set of models for the collection from the server, 
                    setting them on the collection's models array when they arrive`}
              title="collection.fetch()"
              placement="bottom"
            >
              <Button onClick={getDataForDogCollection} type="primary">
                Fetch Collection
              </Button>
            </Popover>
          </FlexBox>
        )}
      </Wrapper>
    </>
  );
});

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

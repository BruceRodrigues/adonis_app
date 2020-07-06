import axios, { AxiosError, AxiosResponse } from "axios";
import { Button, TextField, VFlow } from "bold-ui";
import React, { useState } from "react";
import "./App.css";

const api = axios.create({ baseURL: "http://localhost:3333" });

interface FormModel {
  content: string;
}

function App() {
  const [formState, setFormState] = useState<FormModel>({} as FormModel);

  const handleSubmit = () => {
    console.log(formState);

    api
      .post<FormModel>("/posts", formState)
      .then((res: AxiosResponse) => console.log(res))
      .catch((err: AxiosError) => console.log(err));
  };

  const handleChange = (name: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const t = e.target;
    setFormState((state: FormModel) => ({ ...state, [name]: t.value }));
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <VFlow vSpacing={1}>
          <TextField
            label="Content"
            name="content"
            onChange={handleChange("content")}
            value={formState.content}
          />
          <Button type="submit">Submit</Button>
        </VFlow>
      </form>
    </div>
  );
}

export default App;

const query = `{ helloWorld }`;

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/JSON",
  },
  body: JSON.stringify({
    query: query,
  }),
};

const create = (string) => {
  const body = document.querySelector("body");
  body.innerHTML = string;
} 

fetch("http://localhost:4000/graphql", options)
  .then((response) => response.json())
  .then((data) => create(data.data.helloWorld));

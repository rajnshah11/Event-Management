export const graphqlRequest = async (query, variables = {}, token = null) => {
    const requestBody = {
      query: query,
      variables: variables
    };
  
    const headers = {
      "Content-Type": "application/json"
    };
  
    if (token) {
      headers.Authorization = "Bearer " + token;
    }
  
    const res = await fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: headers
    });
  
    if (res.status !== 200 && res.status !== 201) {
      const errorData = await res.json();
      throw new Error(errorData.errors[0].message || "Failed to create event");
    }
  
    const resData = await res.json();
    return resData;
  };
  
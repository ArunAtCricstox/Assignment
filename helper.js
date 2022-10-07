const baseUrl =
  "https://blkjkw1sr2.execute-api.ap-south-1.amazonaws.com/stock-microservice/";
export const useFetch = (url) => {
  const res = fetch(baseUrl + url)
    .then((res) => res.json())
    .then((data) => {
      return data.data;
    })
    .catch((e) => {
      return e;
    });
  return res;
};

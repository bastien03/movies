const asJson = (res) => {
  res.setHeader('Content-Type', 'application/json');
  return res;
};

export default asJson;

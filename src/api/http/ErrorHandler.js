
const error = (res, err) => {
  console.error('Error:', err);
  if (err === 'DTO_VALIDATION') {
    return res.status(400).send('Input data not valid.');
  }
  return res.status(500).send('Something wrong happend. Please try again later.');
};

export default error;

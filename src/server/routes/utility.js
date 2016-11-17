import { json } from 'body-parser';

export const jsonParser = json();

export const callback = (res) => {
  return (err, polls) => {
    if (err) {
      console.error(err);
      return res.send(new Error('Issue with server, try again later.'));
    }

    return res.send(polls);
  };
};

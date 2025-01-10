export const sendMessage = (obj) => ({
  type: "SEND_MESSAGE",
  payload: {
    data: obj,
  },
});

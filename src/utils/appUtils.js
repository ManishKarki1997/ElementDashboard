const getAvatarLink = (avatar) => {
  if (!avatar)
    return `https://images3.alphacoders.com/119/thumb-1920-1191196.jpg`;

  return `${process.env.VUE_APP_API_URL}/${avatar}`;
};

export { getAvatarLink };

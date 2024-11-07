import Snowflake from 'snowflake-id';

const snowflake = new Snowflake.default({
  mid: 42,
  offset: (2019 - 1970) * 31536000 * 1000,
});

export const uuid = () => {
  return Number(snowflake.generate());
};

import { createParamDecorator } from '@nestjs/common';

export const GetUSer = createParamDecorator((data, obj) => {
  const request = obj.args[2].req;
  return request['user'];
});

import {default as common} from './common.config';
import {default as production} from './production.config';
export const environment = Object.assign({}, common, production, {
  production: true
});

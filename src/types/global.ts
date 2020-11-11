import config from "../config";
import * as errors from '../core/http-exception'
type Errors = typeof errors;
type Config = typeof config;

declare global{
    namespace NodeJS{
        interface Global {
            errs:Errors,
            config:Config
        }
    }
}

global.config = config;
global.errs = errors;

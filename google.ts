/// <reference path="./src/util/IProvider.ts" />
import googleImport, {configure as configureLib} from './src/vendor/google';
import {IProvider, IConfigure} from "./src/util/IProvider";

/**
 * @name configure
 * @type function
 * @param {String} apiKey - API Key
 * @param {Object} [countries] - provide countries information to obtain country/region CODE.
 * @param {Object} [settings]
 */
export const configure: IConfigure = configureLib;

const google: IProvider = googleImport;

export default google;
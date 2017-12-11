/// <reference path="./src/util/IProvider.ts" />
import yandexImport, {configure as configureLib} from './src/vendor/yandex';
import {IDetailedProvider, IConfigure} from "./src/util/IProvider";

/**
 * @name configure
 * @type function
 * @param {String} apiKey - API Key
 * @param {Object} [countries] - provide countries information to obtain country/region CODE.
 * @param {Object} [settings]
 */
export const configure: IConfigure = configureLib;

const yandex: IDetailedProvider = yandexImport;

export default yandex;
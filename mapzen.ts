/// <reference path="./src/util/IProvider.ts" />
import zenImport, {configure as configureLib} from './src/vendor/mapzen';
import {IDetailedProvider, IConfigure} from "./src/util/IProvider";

export const configure: IConfigure = configureLib;

const mapzen: IDetailedProvider = zenImport;

export default mapzen;
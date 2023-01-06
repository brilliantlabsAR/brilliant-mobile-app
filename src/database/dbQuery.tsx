import { DateTime } from "luxon";
import { executeSql } from "./mainDao";
import { GenerateRandomString, GenerateUuid } from "../utils";
import SQLite, {
  openDatabase,
  SQLiteDatabase,
  ResultSet,
  SQLError,
  Transaction,
} from 'react-native-sqlite-storage';
import { Asset, AssetStatus, AssetStatusToString, AssetType, BuildAssetFromDbResult } from "../models";

export const createAssetsTableQuery: string =
  `CREATE TABLE IF NOT EXISTS assets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uuid TEXT UNIQUE NOT NULL, 
    status TEXT CHECK( status IN ('NotTransferred','Transferring','TransferPaused','Transferred') ) NOT NULL, 
    type TEXT CHECK( type IN ('Video','Image') ) NOT NULL,
    file_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    created_timestamp TEXT NOT NULL,
    updated_timestamp TEXT NOT NULL
  );`;

export const dropAssetsTableQrery: string =
  `DROP TABLE IF EXISTS assets`;

export const GetAssetByUuid = async (uuid: string): Promise<Asset | undefined> => {
  try {
    const resultSet: ResultSet = await executeSql(
      `SELECT * FROM assets WHERE uuid = ?`,
      [uuid],
    );
    if (resultSet.rows.length === 0) {
      return;
    }

    const resultDevice: Asset | undefined = BuildAssetFromDbResult(
      resultSet.rows.item(0),
    );
    return resultDevice;
  } catch (e) {
    console.log(
      `getAsset failed for id ${uuid}. Stack: ${e.stack}; code: ${e.code}; message: ${e.message}.`,
    );
    return;
  }
}
export const CreateAsset = async (
  status: AssetStatus,
  type: AssetType,
  fileName: string,
  filePath: string,
  assetId?: string,
): Promise<Asset> => {
  let uuid: string = GenerateRandomString();

  if (assetId != null) {
    uuid = assetId;
  }

  try {
    await executeSql(
      `INSERT INTO assets (uuid, status, type, created_timestamp, updated_timestamp, file_name, file_path) 
              VALUES (?, ?, ?, ?, ?, ?, ?);
              `,
      [
        uuid,
        status,
        type,
        DateTime.now().toISO(),
        DateTime.now().toISO(),
        fileName,
        filePath
      ],
    );

    const result: Asset | undefined = await GetAssetByUuid(uuid);
    if (result == null) {
      throw new Error(`Failed to fetch newly-created asset entry.`);
    }

    return result;
  } catch (e) {
    console.log(
      `createAsset failed status=${status}, type=${type}, uuid=${uuid}, fileName=${fileName} filePath=${filePath}  Stack: ${e.stack}; code: ${e.code}; message: ${e.message}.`,
    );
    throw e;
  }
}

export const GetTotalPage = async () => {
  try {
    let totalPage: number = 0;
    let sql: string = `SELECT * FROM assets`;
    const result: ResultSet = await executeSql(sql);
    if (result.rows.raw().length != 0) {
      totalPage = Math.ceil(result.rows.raw().length / 20);
    }
    // console.log("totalPageFromDb", totalPage);
    return totalPage;
  } catch (e) {
    throw e;
  }
}

export const GetAssets = async (
  // pageNumber: number,                                                 //for pagination 
): Promise<Array<Asset>> => {
  console.log('Begin MainDao.getAssets');
  try {
    let sql: string = `SELECT * FROM assets`;
    sql = `${sql} ORDER BY created_timestamp DESC`;

    /**  
    sql = `${sql} ORDER BY created_timestamp DESC LIMIT ? OFFSET ?`;    //for pagination 

    console.log('Begin MainDao.getAssets.beforeExecuteSql');

    let limit = 20;
    let offset = limit * (pageNumber - 1);

    const resultSet: ResultSet = await executeSql(sql, [
      limit,
      offset,
    ]);         
    **/

    const resultSet: ResultSet = await executeSql(sql, []);
    console.log('Begin MainDao.getAssets.afterExecuteSql');
    const resultAssets: Array<Asset> = new Array();

    for (let i = 0; i < resultSet.rows.raw().length; i++) {
      const dbResult: any = resultSet.rows.raw()[i];

      const asset: Asset | undefined = BuildAssetFromDbResult(dbResult);
      if (asset == null) {
        continue;
      }
      resultAssets.push(asset);
    }

    return resultAssets;
  } catch (e) {
    // console.log(
    //   `getAssets failed for statuses ${statuses != null ? statuses.join(',') : 'not set'
    //   }. Stack: ${e.stack}; code: ${e.code}; message: ${e.message}.`,
    // );
    throw e;
  }
}

export const DeleteAssetById = async (id: number): Promise<void> => {
  try {
    await executeSql(`DELETE FROM assets WHERE id = ?`, [id]);
  } catch (e) {
    console.log(
      `deleteAssetById failed. Stack: ${e.stack}; code: ${e.code}; message: ${e.message}.`,
    );
    throw e;
  }
}

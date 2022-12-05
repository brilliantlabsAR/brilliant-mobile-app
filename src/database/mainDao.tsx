import SQLite, {
    SQLiteDatabase,
    ResultSet
} from 'react-native-sqlite-storage';
import { GenerateRandomString } from '../utils';


let _sqlite: SQLiteDatabase | undefined = undefined;

export const connectDatabase = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        _sqlite = SQLite.openDatabase(
            { name: 'monocle.db' },
            () => {
                console.log(`Database connection successfully established.`);
                resolve();
            },
            (e: SQLite.SQLError) => {
                console.log(`Something went wrong when trying to connect to local database. Code: ${e.code}; message: ${e.message}.`);
                reject(e);
            }
        );
    });
}

export const executeSql = (
    sql: string,
    args: Array<any> = new Array(),
): Promise<ResultSet> => {
    return new Promise((resolve, reject) => {
        const transactionId: string = GenerateRandomString();
        console.log(`Single-statement transaction ${transactionId} started.`);
        console.log(`Single-statement transaction ${transactionId} sql: ${sql}.`);

        if (_sqlite == null) {
            console.log(`Single-statement transaction ${transactionId} aborted since database is not connected.`);
            reject(new Error(`Database is not connected.`));
            return;
        }

        _sqlite.executeSql(
            sql,
            args,
            (resultSet: any) => {  // Due to some issues with the library’s types we have to use `any`.
                console.log(`Single-statement transaction ${transactionId} finished successfully.`);
                resolve(resultSet);
            },
            (e: any) => { // Due to some issues with the library’s types we have to use `any`.
                console.log(`Single-statement transaction ${transactionId} failed and rolled back. Code: ${e.code}; message: ${e.message}.`);
                reject(e);
            },
        );
    });
}

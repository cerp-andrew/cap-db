using { namespace.sourceData as src } from '../db/sourceData-db';

service sourceData {
    entity dbTable as projection on src.dbTable;
    action doInsert();
}
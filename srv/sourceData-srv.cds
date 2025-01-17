using { namespace.sourceData as src } from '../db/sourceData-db';

service sourceData {
    entity dbTable as projection on src.dbTable;
//	entity eamRequest as projection on src.eamRequest;
//	entity eamRequestRole as projection on src.eamRequestRole;


    action doInsert();
}
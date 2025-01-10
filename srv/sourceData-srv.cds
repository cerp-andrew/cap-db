using { cerpass.sourceData as src } from '../db/sourceData-db';

service sourceData {
    //entity V_USERNAME as projection on src.V_USERNAME;
    entity stageV_USERNAME as projection on src.stageV_USERNAME;
    action doInsert();
}
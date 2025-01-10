using { cerpass.systems as sys } from '../db/systems-db';


service systems {
	
    entity externalSystems as projection on sys.externalSystems;
    entity customerSystems as projection on sys.customerSystems;


}
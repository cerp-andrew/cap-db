namespace cerpass.sourceData;

using { managed, cuid } from '@sap/cds/common';
using { cerpass.systems as systems } from '../db/systems-db';


	aspect aspectV_USERNAME: {
	//	key	GUID		    : UUID;
		key MANDT		    : String(3);
	};

	// entity V_USERNAME: aspectV_USERNAME, managed {
	// 	customerSystem  : association[1] to systems.customerSystems;
	// }

    entity stageV_USERNAME: aspectV_USERNAME {
        //customerSystem  : association[1] to systems.customerSystems;
    }
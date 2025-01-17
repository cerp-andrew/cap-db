namespace namespace.sourceData;
using { managed, temporal, cuid } from '@sap/cds/common';

	entity dbTable: managed {
		key mandt : String(3);
			sid: String(4);
	};
	
	entity eamRequest {
		key eamRequestKey		: UUID;
			requestor			: String;
			toEamRequestRole	: composition of many eamRequestRole on toEamRequestRole.eamRequest = $self;
	};

	entity eamRequestRole {
		key eamRequestRoleKey   : UUID;
			eamRequest			: association to eamRequest;
			role				: String;
	};
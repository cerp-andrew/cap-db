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

	// Crate a view of the eamRequest entity
	view eamRequestView as select from eamRequest {
		eamRequestKey,
		requestor
	};

	aspect aspectHRP1000 : {
    key	GUID    : UUID;
        Mandt   : String(3);
        Plvar   : String(2);
        Otype   : String(2);
        Objid   : String(8);
        Istat   : String(1);
        Begda   : Timestamp;
        Endda   : Timestamp;
        Langu   : String(2);
        Seqnr   : String(3);
        Otjid   : String(10);
        Infty   : String(4);
        Aedtm   : Timestamp;
        Uname   : String(12);
        Reasn   : String(2);
        Histo   : String(1);
        Itxnr   : String(8);
        Short   : String(12);
        Stext   : String(40);
        Gdate   : Timestamp;
        McShort : String(12);
        McStext : String(40);
        McSeark : String(52);
	};

	entity HRP1000 : managed, aspectHRP1000 {
		customerSystem : Association[1] to customerSystems;
	};

	entity customerSystems : managed {
		key ID                          : UUID;
			systemId                    : String(3);
			systemClient                : String(3);
			btpDestination              : String(50);
			requestTimeout              : Integer;
			systemType                  : String(15);
			coreExtracts                : Boolean;
			fioriExtracts               : Boolean;
			logLevel                    : String(6);
			alertLevel                  : String(8);        
			eamExtracts                 : Boolean;
			usageExtDate                : Date;
			usageError                  : String;
			meteringExtDate             : Timestamp;
			meteringError               : String;
			active                      : Boolean;
	}
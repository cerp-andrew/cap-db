namespace namespace.sourceData;
using { managed, temporal, cuid } from '@sap/cds/common';

	entity dbTable: managed {
		key mandt : String(3);
			sid: String(4)
	};

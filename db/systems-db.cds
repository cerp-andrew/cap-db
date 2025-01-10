namespace cerpass.systems;
using { managed } from '@sap/cds/common';
using { cerpass.sourceData as sourceData } from '../db/sourceData-db';

entity externalSystems : managed {
    key ID                      : UUID;
        systemId                : String(20);
        systemDescription       : String(50);
        toCustomerSystems       : composition of many customerSystems on toCustomerSystems.externalSystems = $self;
        toErrorCodes            : composition of many errorCodes on toErrorCodes.externalSystems = $self;
}

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
        toParallelProcSettings      : composition of many parallelProcSettings on toParallelProcSettings.customerSystems = $self;
        externalSystems             : association[1] to externalSystems;
       // toSourceV_USERNAME          : composition of many sourceData.stageV_USERNAME on toSourceV_USERNAME.customerSystem = $self;

}

entity errorCodes : managed {
    key ID                      : UUID;
        errorCode               : String(50);
        errorDescription        : String(100);
        externalSystems         : association[1] to externalSystems;
}

//These are SAP backend field names and hence not our standard of camelCase
entity parallelProcSettings {
    key customerSystems         : association[1] to customerSystems;
    key ExtractType             : String;
        NumProcesses            : Integer;
        CatalogBlockSize        : Integer;
        PercProcesses           : Integer;
        TimeOut                 : Integer;
}
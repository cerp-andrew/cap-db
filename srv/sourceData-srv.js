

module.exports = async (srv) => {
    
    //Put here for debugging db services but this does work
    srv.on('CREATE', 'dbTable', async (req, next) => {
        await next();
    });
    
    srv.on('doInsert', async () => {
        
        //action to show some issues with various forms of sql. CDS type 'cuid' is also failing
        //the same way managed fields fail. Managed fields are easier to show the issue as I see th enull records
        //cuid cannot be inserted with null as it is the key field
        
        console.log('doInsert');
        await cds.tx (async ()=>{
            let results = await cds.run(DELETE.from('namespace.sourceData.dbTable'));
            console.log(results);
        })

        //this does NOT populate managed fields
        try {
            let insertColumnString = ['mandt','sid'];
            let rowsToInsertArray = [['100', 'ABC']];
            let result = await cds.run(INSERT.into('namespace.sourceData.dbTable')
                                             .columns(insertColumnString)
                                             .rows(rowsToInsertArray));   
            console.log(result);         
        } catch (error) {
            console.log(error);
        }        

        //this does populate managed fields
        try {
            let rowsToInsertEntries = {mandt: '200', sid: 'DEF'};
            let results = await cds.run(INSERT.into('namespace.sourceData.dbTable')
                                              .entries(rowsToInsertEntries));
            console.log(results);
        } catch (error) {
            console.log(error);
        };
        
        //this does NOT populate managed fields
        try {
            let query = {INSERT:{ into: { ref: ['namespace.sourceData.dbTable']},
                columns: [ 'mandt', 'sid' ],
                rows: [ [ '300', 'XYZ' ] ]
            }};  
            let results = await cds.run(query);
            console.log(results);          
        }
        catch (error) {
            console.log(error);
        }

        try {
            let eamRequestRole = await cds.run(
                SELECT.from("namespace.sourceData.eamRequestRole").where({
                    eamRequest_eamRequestKey: '898cf0c6-53cc-4d13-82db-b82bb7d3d0b7'
                })
                      .columns(
                        "eamRequestRoleKey",
                        "eamRequest.eamRequestKey",
                        "eamRequest.requestor",
                        "role"
                        )  
                )
                //with the new database driver, requestor is undefined
                //npm add @sap-cds-hana and this now works

                //remove @cap-js/hana and add hdb and it also works
                console.log(`Requestor is ${eamRequestRole[0].requestor}`);
        } catch (error) {
            console.log(error);
        }
        
        
    });

    srv.on('doSelect', async () => {
        console.log('doSelect');
        let currentDate = new Date().toISOString();

        try {
            //Do a read with the correctly cased table name (This will work and return the column names in the case they are defined in the CDS definition)
            console.log('Run SELECT with correctly cased table name');
            let result = await cds.run(
                SELECT.from("namespace.sourceData.HRP1000")
                    .columns("GUID", "Mandt", "Otype", "Objid", "Short", "Stext", "Begda", "Endda", "customerSystem_ID", "customerSystem.systemId")
                    .where({
                        Otype: "S",
                        Begda: { "<=": currentDate },
                        Endda: { ">=": currentDate },
                        "customerSystem.systemId": "SYS"
                    })
            );
            //This will work and return the column names in the case they are defined in the CDS definition
            console.log("Correctly cased table name: ", result);
            console.log("Results returned with column names in the case they are defined in the CDS definition and columns from the association are returned in the format associationName_columnName");
        } catch (error) {
            console.log(error);
        }

        //Do a select with the incorrectly cased table name (This will will work but the result will return with the column names in uppercase not the case defined in the CDS definition)
        try {
            console.log('Run SELECT with incorrectly cased table name');
            let result = await cds.run(
                SELECT.from("namespace.sourceData.hrp1000")
                    .columns("GUID", "Mandt", "Otype", "Objid", "Short", "Stext", "Begda", "Endda", "customerSystem_ID", "customerSystem.systemId")
                    .where({
                        Otype: "S",
                        Begda: { "<=": currentDate },
                        Endda: { ">=": currentDate },
                        "customerSystem.systemId": "SYS"
                    })
            );
            //This will work but the result will return with the column names in uppercase not the case defined in the CDS definition
            console.log("Incorrectly cased table name: ", result);
            console.log("Results returned with column names in uppercase and columns from the association are returned in the format columnName not associationName_columnName");
        } catch (error) {
            console.log(error);
        }

        //Do a select with the corectly cased table name but the columns in the wrong case (This will fail)
        try {
            console.log('Run SELECT with correctly cased table name but columns in the wrong case');
            let result = await cds.run(
                SELECT.from("namespace.sourceData.HRP1000")
                    .columns("guid", "mandt", "otype", "objid", "short", "stext", "begda", "endda", "customersystem_id", "customersystem.systemid")
                    .where({
                        otype: "S",
                        begda: { "<=": currentDate },
                        endda: { ">=": currentDate },
                        "customersystem.systemid": "SYS"
                    })
            );
            console.log(result);
        } catch (error) {
            //This will fail as the columns are not in the correct case
            console.log("Correctly cased table name but columns in the wrong case: ", error);
        }

        //Do a select with the incorrectly cased table name and the columns in the wrong case (This will work)
        try {
            console.log('Run SELECT with incorrectly cased table name and columns in the wrong case');
            let result = await cds.run(
                SELECT.from("namespace.sourceData.hrp1000")
                    .columns("guid", "mandt", "otype", "objid", "short", "stext", "begda", "endda", "customersystem_id", "customersystem.systemid")
                    .where({
                        otype: "S",
                        begda: { "<=": currentDate },
                        endda: { ">=": currentDate },
                        "customersystem.systemid": "SYS"
                    })
            );
            //This will work but the result will return with the column names in uppercase not the case defined in the CDS definition
            console.log("Incorrectly cased table name and columns in the wrong case: ", result);
            console.log("Results returned with column names in uppercase");
        } catch (error) {
            console.log(error);
        }

    });
}
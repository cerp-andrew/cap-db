

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
}
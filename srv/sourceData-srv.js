

module.exports = async (srv) => {
    srv.on('doInsert', async (msg) => {
        console.log('doInsert');

        //let insertColumnString = '"MANDT","BNAME","PERSNUMBER","NAME_LAST","NAME_TEXT","MC_NAMEFIR","MC_NAMELAS","SYSTEMID","CUSTOMERSYSTEM_ID"';
        //let rowsToInsertArray = ['200', 'NPRINCE', '0000022975', 'Prince', 'Neil Prince', 'NEIL', 'PRINCE', 'CED', 'a0c6a346-3ad4-4b06-9553-01fa0bac9fd7', '983f62b7-5cc2-4bc4-a10e-3d7339e572b9'];
        //let insertColumnString = '"MANDT","SYSTEMID","BNAME","PERSNUMBER","NAME_LAST","NAME_TEXT","MC_NAMEFIR","MC_NAMELAS","customerSystem_ID"';
        //let rowsToInsertArray = ['200', 'CED', 'NPRINCE', '0000022975', 'Prince', 'Neil Prince', 'NEIL', 'PRINCE',  'a0c6a346-3ad4-4b06-9553-01fa0bac9fd7'];      
        

        //no association to system table
        //let insertColumnString = '"MANDT","SYSTEMID","BNAME","PERSNUMBER","NAME_LAST","NAME_TEXT","MC_NAMEFIR","MC_NAMELAS"';
        //let rowsToInsertArray = ['200', 'CED', 'NPRINCE', '0000022975', 'Prince', 'Neil Prince', 'NEIL', 'PRINCE']; 
        
        // let insertColumnString = '"ID", "MANDT"';
        // let rowsToInsertArray = ['e0a10cf2-862d-4467-8c6c-588a441c45bd', '200'];  
        
        let insertColumnString = '"MANDT"';
        let rowsToInsertArray = [['200']];  

        try {
            let result = await INSERT.into('cerpass.sourceData.stageV_USERNAME').columns(insertColumnString).rows(rowsToInsertArray);   
            console.log(result);         
        } catch (error) {
            console.log(error);
        }
 
        
    });
}
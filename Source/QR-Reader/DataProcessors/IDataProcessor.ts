'use strict';

interface IDataProcessor {
    dataType:DataType;
    initiate: (data: string) => void;
    // Leave these
    afterSuccessCallback: (executionEvent:() => void) => void;
    errorCallback: (errorMessage:string) => void;
}
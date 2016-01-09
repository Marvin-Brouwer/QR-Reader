class EmailDataProcessor implements IDataProcessor {
    public dataType: DataType = DataType.Email;

    public initiate(data: string): void {
        let email = data.replace(<any>DataType.Email, String());
        email = email.indexOf('?') < 0 ? email : email.split('?')[0];
        if (confirm(`Send an email to ${email}?`))
            UrlHelper.redirect(data);
            
    }

    // Leave these
    public afterSuccessCallback: (executionEvent: () => void) => void;
    public errorCallback: (errorMessage: string) => void;

}
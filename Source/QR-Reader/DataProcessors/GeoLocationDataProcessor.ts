// http://gmaps-samples.googlecode.com/svn/trunk/simplewizard/makestaticmap.html
class GeoLocationDataProcessor implements IDataProcessor {
    public dataType: DataType = DataType.GeoLocation;
    private mapsUrl: string = 'https://www.google.nl/maps/place';
    private staticMapsUrl: string = 'http://maps.google.com/maps/api/staticmap';

    public initiate(data: string): void {
        let coordinates = data.replace(<any>this.dataType, String()).split(',');

        prompt('Show this image', this.buildStaticMapImage(coordinates)); // google map
        if (!DeviceHelper.isTouchEnabled()) 
            prompt('Navigate to:', `${this.mapsUrl}/${coordinates[0]},${coordinates[1]}`); // google map
        else
            if (confirm('Send an sms?'))
                UrlHelper.redirect(data, () => { alert(`Failed to navigate to: '${data}'!`) }); // phone
            
    }

    private buildStaticMapImage(geoCoordinates: string[]) :string {
        return `${this.staticMapsUrl}?zoom=13&markers=${geoCoordinates[0]},${geoCoordinates[1]}&size=200x200`;
    }

    // Leave these
    public afterSuccessCallback(executionEvent: () => void): void {}
    public errorCallback(errorMessage: string): void {}
}
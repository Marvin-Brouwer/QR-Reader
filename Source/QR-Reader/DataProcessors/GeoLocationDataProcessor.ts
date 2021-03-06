﻿// http://gmaps-samples.googlecode.com/svn/trunk/simplewizard/makestaticmap.html
class GeoLocationDataProcessor implements IDataProcessor {
    public dataType: DataType = DataType.GeoLocation;
    private mapsUrl: string = 'https://www.google.nl/maps/place';
    private staticMapsUrl: string = 'http://maps.google.com/maps/api/staticmap';

    public process(data: string): void {
        let actionManager = ioc.Container.getCurrent().resolve<ActionManager>(ActionManager);
        let coordinates = data.replace(<any>this.dataType, String()).split(',');
        let container = document.createElement('div');
        container.className = 'geo';
        let imageContainer = document.createElement('img');
        imageContainer.src = this.buildStaticMapImage(coordinates);
        let linkContainer = document.createElement('a');
        linkContainer.href = data;
        linkContainer.className = 'map';
        linkContainer.appendChild(imageContainer);
        container.appendChild(linkContainer);
        let googleLinkContainer = document.createElement('a');
        googleLinkContainer.href = `${this.mapsUrl}/${coordinates[0]},${coordinates[1]}`;
        googleLinkContainer.innerText = TextDefinitions.showOnGoogleMaps;
        googleLinkContainer.target = TextDefinitions.blankLinkTarget;
        googleLinkContainer.className = 'googleMap';
        container.appendChild(googleLinkContainer);
        actionManager.showCallToAction(`${DataType[this.dataType]}`, container);
    }

    private buildStaticMapImage(geoCoordinates: string[]): string {
        return `${this.staticMapsUrl}?zoom=13&markers=${geoCoordinates[0]},${geoCoordinates[1]}&size=200x200`;
    }
}
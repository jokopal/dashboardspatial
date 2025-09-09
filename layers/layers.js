ol.proj.proj4.register(proj4);
//ol.proj.get("EPSG:4326").setExtent([117.410000, 2.160833, 117.605250, 2.214972]);
var wms_layers = [];


        var lyr_GoogleSatellite_0 = new ol.layer.Tile({
            'title': 'Google Satellite',
            'type':'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
            attributions: ' ',
                url: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
            })
        });

        var lyr_OSMStandard_1 = new ol.layer.Tile({
            'title': 'OSM Standard',
            'type':'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
            attributions: ' &nbsp &middot; <a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors, CC-BY-SA</a>',
                url: 'http://tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        });
var format_TUKS_2 = new ol.format.GeoJSON();
var features_TUKS_2 = format_TUKS_2.readFeatures(json_TUKS_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:4326'});
var jsonSource_TUKS_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_TUKS_2.addFeatures(features_TUKS_2);
var lyr_TUKS_2 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_TUKS_2, 
                style: style_TUKS_2,
                popuplayertitle: 'TUKS',
                interactive: true,
                title: '<img src="styles/legend/TUKS_2.png" /> TUKS'
            });

lyr_GoogleSatellite_0.setVisible(true);lyr_OSMStandard_1.setVisible(true);lyr_TUKS_2.setVisible(true);
var layersList = [lyr_GoogleSatellite_0,lyr_OSMStandard_1,lyr_TUKS_2];
lyr_TUKS_2.set('fieldAliases', {'latitude': 'latitude', 'longitude': 'longitude', 'Site': 'Site', 'field_4': 'Objek', 'Izin': 'Izin', 'Nomor SK': 'Nomor SK', 'Terbit': 'Terbit', 'Expired': 'Expired', 'Progress': 'Progress', 'LinkLap': 'Report', });
lyr_TUKS_2.set('fieldImages', {'latitude': 'TextEdit', 'longitude': 'TextEdit', 'Site': 'TextEdit', 'field_4': 'TextEdit', 'Izin': 'TextEdit', 'Nomor SK': 'TextEdit', 'Terbit': 'DateTime', 'Expired': 'DateTime', 'Progress': 'TextEdit', 'LinkLap': 'UniqueValues', });
lyr_TUKS_2.set('fieldLabels', {'latitude': 'hidden field', 'longitude': 'hidden field', 'Site': 'inline label - always visible', 'field_4': 'inline label - always visible', 'Izin': 'inline label - always visible', 'Nomor SK': 'inline label - always visible', 'Terbit': 'inline label - always visible', 'Expired': 'inline label - always visible', 'Progress': 'inline label - visible with data', 'Link': 'hidden field', 'LinkLap': 'no label', });
lyr_TUKS_2.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});
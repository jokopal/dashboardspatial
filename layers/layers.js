ol.proj.proj4.register(proj4);
//ol.proj.get("EPSG:4326").setExtent([116.663583, 1.899960, 117.605250, 3.353206]);
var wms_layers = [];


        var lyr_OSMStandard_0 = new ol.layer.Tile({
            'title': 'OSM Standard',
            'type':'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
            attributions: ' &nbsp &middot; <a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors, CC-BY-SA</a>',
                url: 'http://tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        });

        var lyr_GoogleSatellite_1 = new ol.layer.Tile({
            'title': 'Google Satellite',
            'type':'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
            attributions: ' ',
                url: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
            })
        });
var format_BK_2 = new ol.format.GeoJSON();
var features_BK_2 = format_BK_2.readFeatures(json_BK_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:4326'});
var jsonSource_BK_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_BK_2.addFeatures(features_BK_2);
var lyr_BK_2 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_BK_2, 
                style: style_BK_2,
                popuplayertitle: 'BK',
                interactive: true,
                title: '<img src="styles/legend/BK_2.png" /> BK'
            });
var format_GD_3 = new ol.format.GeoJSON();
var features_GD_3 = format_GD_3.readFeatures(json_GD_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:4326'});
var jsonSource_GD_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_GD_3.addFeatures(features_GD_3);
var lyr_GD_3 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_GD_3, 
                style: style_GD_3,
                popuplayertitle: 'GD',
                interactive: true,
                title: '<img src="styles/legend/GD_3.png" /> GD'
            });
var format_Area_4 = new ol.format.GeoJSON();
var features_Area_4 = format_Area_4.readFeatures(json_Area_4, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:4326'});
var jsonSource_Area_4 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Area_4.addFeatures(features_Area_4);
var lyr_Area_4 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Area_4, 
                style: style_Area_4,
                popuplayertitle: 'Area',
                interactive: true,
                title: '<img src="styles/legend/Area_4.png" /> Area'
            });
var format_Titik_5 = new ol.format.GeoJSON();
var features_Titik_5 = format_Titik_5.readFeatures(json_Titik_5, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:4326'});
var jsonSource_Titik_5 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Titik_5.addFeatures(features_Titik_5);
var lyr_Titik_5 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Titik_5, 
                style: style_Titik_5,
                popuplayertitle: 'Titik',
                interactive: true,
                title: '<img src="styles/legend/Titik_5.png" /> Titik'
            });
var group_Izin2025 = new ol.layer.Group({
                                layers: [lyr_Area_4,lyr_Titik_5,],
                                fold: 'close',
                                title: 'Izin 2025'});
var group_Izin2024 = new ol.layer.Group({
                                layers: [lyr_BK_2,lyr_GD_3,],
                                fold: 'close',
                                title: 'Izin 2024'});

lyr_OSMStandard_0.setVisible(true);lyr_GoogleSatellite_1.setVisible(true);lyr_BK_2.setVisible(true);lyr_GD_3.setVisible(true);lyr_Area_4.setVisible(true);lyr_Titik_5.setVisible(true);
var layersList = [lyr_OSMStandard_0,lyr_GoogleSatellite_1,group_Izin2024,group_Izin2025];
lyr_BK_2.set('fieldAliases', {'Id': 'Id', 'Izin': 'Izin', 'Berlaku': 'Berlaku', 'Keterangan': 'Keterangan', 'Progress': 'Progress', });
lyr_GD_3.set('fieldAliases', {'Id': 'Id', 'Izin': 'Izin', 'Berlaku': 'Berlaku', 'Keterangan': 'Keterangan', 'Progress': 'Progress', });
lyr_Area_4.set('fieldAliases', {'Layer': 'Layer', 'id': 'id', 'Izin': 'Izin', 'Nomor_SK': 'Nomor_SK', 'Terbit': 'Terbit', 'Expired': 'Expired', 'Progres': 'Progres', 'Izin_Turun': 'Izin Turunan', 'FlowPro': 'Flow Proses', });
lyr_Titik_5.set('fieldAliases', {'latitude': 'latitude', 'longitude': 'longitude', 'Site': 'Site', 'field_4': 'Objek', 'Izin': 'Izin', 'Nomor SK': 'Nomor SK', 'Terbit': 'Terbit', 'Expired': 'Expired', 'Progress': 'Progress', 'LinkLap': 'Report', });
lyr_BK_2.set('fieldImages', {'Id': '', 'Izin': '', 'Berlaku': '', 'Keterangan': '', 'Progress': '', });
lyr_GD_3.set('fieldImages', {'Id': 'Range', 'Izin': 'TextEdit', 'Berlaku': 'TextEdit', 'Keterangan': 'TextEdit', 'Progress': 'Range', });
lyr_Area_4.set('fieldImages', {'Layer': 'TextEdit', 'id': 'TextEdit', 'Izin': 'TextEdit', 'Nomor_SK': 'TextEdit', 'Terbit': 'DateTime', 'Expired': 'DateTime', 'Progres': 'TextEdit', 'Izin_Turun': 'TextEdit', 'FlowPro': 'TextEdit', });
lyr_Titik_5.set('fieldImages', {'latitude': 'TextEdit', 'longitude': 'TextEdit', 'Site': 'TextEdit', 'field_4': 'TextEdit', 'Izin': 'TextEdit', 'Nomor SK': 'TextEdit', 'Terbit': 'DateTime', 'Expired': 'DateTime', 'Progress': 'TextEdit', 'LinkLap': 'UniqueValues', });
lyr_BK_2.set('fieldLabels', {'Id': 'no label', 'Izin': 'no label', 'Berlaku': 'no label', 'Keterangan': 'no label', 'Progress': 'no label', });
lyr_GD_3.set('fieldLabels', {'Id': 'no label', 'Izin': 'no label', 'Berlaku': 'no label', 'Keterangan': 'no label', 'Progress': 'no label', });
lyr_Area_4.set('fieldLabels', {'Layer': 'hidden field', 'id': 'hidden field', 'Izin': 'inline label - always visible', 'Nomor_SK': 'inline label - always visible', 'Terbit': 'inline label - always visible', 'Expired': 'inline label - always visible', 'Progres': 'inline label - always visible', 'Izin_Turun': 'inline label - visible with data', 'FlowPro': 'inline label - visible with data', });
lyr_Titik_5.set('fieldLabels', {'latitude': 'hidden field', 'longitude': 'hidden field', 'Site': 'inline label - always visible', 'field_4': 'inline label - always visible', 'Izin': 'inline label - always visible', 'Nomor SK': 'inline label - always visible', 'Terbit': 'inline label - always visible', 'Expired': 'inline label - always visible', 'Progress': 'inline label - visible with data', 'LinkLap': 'inline label - visible with data', });
lyr_Titik_5.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});
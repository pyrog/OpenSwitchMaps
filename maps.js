module.exports = [{
    name: "Google Maps",
    category: "Main maps",
    domain: "www.google.com",
    urlPattern: /google.*maps/,
    getUrl(lat, lon, zoom) {
      return 'https://www.google.com/maps/@' + lat + ',' + lon + ',' + zoom + 'z';
    },
    getLatLonZoom(url) {

      if (url.match(/google.*maps.*,[0-9.]*z/)) {
		const [, lat, lon, zoom] = url.match(/@(-?\d[0-9.]*),(-?\d[0-9.]*),(\d{1,2})[.z]/);

        return [lat, lon, zoom];
      } else if (url.match(/google.*maps.*m\//)) {
        let [, lat, lon, zoom] = url.match(/@(-?\d[0-9.]*),(-?\d[0-9.]*),(\d[0-9.]*)[m]/);
        zoom = Math.round(-1.4436 * Math.log(zoom) + 26.871);
        return [lat, lon, zoom];
      } else if (url.match(/google.*maps.*y,/)) {
        let [, lat, lon, zoom] = url.match(/@(-?\d[0-9.]*),(-?\d[0-9.]*),([0-9]*)[a]/);
        zoom = Math.round(-1.44 * Math.log(zoom) + 27.5);
        return [lat, lon, zoom];
		}
		
    },
  },
  {
    name: "OpenStreetMap",
    category: "Main maps",
    domain: "www.openstreetmap.org",
    urlPattern: /www\.openstreetmap\.org/,
    getUrl(lat, lon, zoom) {
      return 'https://www.openstreetmap.org/#map=' + zoom + '/' + lat + '/' + lon;
    },
    getLatLonZoom(url) {
//      url2 = p[1];  // tableau à 1 élément contenant le lien vers la page du noeud

//      const [m, zoom, lat, lon] = url.match(/map=(\d{1,2})\/(-?\d[0-9.]*)\/(-?\d[0-9.]*)/);
      var t = url.match(/map=(\d{1,2})\/(-?\d[0-9.]*)\/(-?\d[0-9.]*)/);
     console.log('t1 : ' + t);
      if(t == null) {
        var p = browser.tabs.executeScript({
          code: `url = document.getElementsByClassName("geolink")[0].getAttribute("href"); url;`
        });
      
        p.then(function(url) {
         console.log('promesse tenue : ' + url);
          console.log('new url >' + url + '<');
          t = url[0].match(/map=(\d{1,2})\/(-?\d[0-9.]*)\/(-?\d[0-9.]*)/);
//          console.log('t2 : ' + t);
          return [t[2], t[3], t[1]];
       
          // pb ici
        });
      }
      else     
        return [t[2], t[3], t[1]];
    },
  },
  {
    name: "Mapillary",
    category: "Main maps",
    domain: "www.mapillary.com",
    urlPattern: /www\.mapillary\.com/,
    getUrl(lat, lon, zoom) {
      return 'https://www.mapillary.com/app/?lat=' + lat + '&lng=' + lon + '&z=' + zoom;
    },
    getLatLonZoom(url) {
      const [, lat, lon, zoom] = url.match(/lat=(-?\d[0-9.]*)&lng=(-?\d[0-9.]*)&z=(\d{1,2})/);
      return [lat, lon, zoom];
    },
  },
  {
    name: "地理院地図",
    category: "Main maps",
    domain: "maps.gsi.go.jp",
    urlPattern: /maps\.gsi\.go\.jp/,
    getUrl(lat, lon, zoom) {
      return 'https://maps.gsi.go.jp/#' + zoom + '/' + lat + '/' + lon + '/';
    },
    getLatLonZoom(url) {
      const [, zoom, lat, lon] = url.match(/#(\d{1,2})\/(-?\d[0-9.]*)\/(-?\d[0-9.]*)/);
      return [lat, lon, zoom];
    },
  },
  {
    name: "OpenStreetCam",
    category: "Main maps",
    domain: "openstreetcam.org",
    urlPattern: /openstreetcam\.org/,
    getUrl(lat, lon, zoom) {
      return 'https://openstreetcam.org/map/@' + lat + ',' + lon + ',' + zoom + 'z';
    },
    getLatLonZoom(url) {
      const [, lat, lon, zoom] = url.match(/@(-?\d[0-9.]*),(-?\d[0-9.]*),(\d{1,2})/);
      return [lat, lon, zoom];
    },
  },
  {
    name: "F4map",
    category: "Main maps",
    domain: "f4map.com",
    urlPattern: /demo\.f4map\.com/,
    getUrl(lat, lon, zoom) {
      return 'https://demo.f4map.com/#lat=' + lat + '&lon=' + lon + '&zoom=' + zoom;
    },
    getLatLonZoom(url) {
      const [, lat, lon, zoom] = url.match(/#lat=(-?\d[0-9.]*)&lon=(-?\d[0-9.]*)&zoom=(\d{1,2})/);
      return [lat, lon, zoom];
    },
  },
  {
    name: "Yandex",
    category: "Main maps",
    domain: "yandex.com",
    urlPattern: /yandex.*maps/,
    getUrl(lat, lon, zoom) {
      return 'https://yandex.com/maps/?ll=' + lon + '%2C' + lat + '&z=' + zoom;
    },
    getLatLonZoom(url) {
      const [, lon, lat, zoom] = url.match(/ll=(-?\d[0-9.]*)%2C(-?\d[0-9.]*)&z=(\d{1,2})/);
      return [lat, lon, zoom];
    },
  },
  {
    name: "Qwant Maps",
    category: "Main maps",
    domain: "qwant.com",
    urlPattern: /www\.qwant\.com/,
    getUrl(lat, lon, zoom) {
      return 'https://www.qwant.com/maps/#map=' + zoom + '/' + lat + '/' + lon;
    },
    getLatLonZoom(url) {
      const [, zoom, lat, lon] = url.match(/#map=(\d{1,2})[0-9.]*\/(-?\d[0-9.]*)\/(-?\d[0-9.]*)/);
      return [lat, lon, zoom];
    },
  },
  {
    name: "Overpass-turbo",
    category: "OSM tools",
    domain: "overpass-turbo.eu",
    getUrl(lat, lon, zoom) {
      return 'http://overpass-turbo.eu/?Q=&C=' + lat + ';' + lon + ';' + zoom;
    },
  },
  {
    name: "Osmose",
    category: "OSM tools",
    domain: "osmose.openstreetmap.fr",
    urlPattern: /osmose\.openstreetmap\.fr/,
    getUrl(lat, lon, zoom) {
      return 'http://osmose.openstreetmap.fr/map/#zoom=' + zoom + '&lat=' + lat + '&lon=' + lon;
    },
    getLatLonZoom(url) {
      const [, zoom, lat, lon] = url.match(/#zoom=(\d{1,2})&lat=(-?\d[0-9.]*)&lon=(-?\d[0-9.]*)/);
      return [lat, lon, zoom];
    },
  },
  {
    name: "KeepRight",
    category: "OSM tools",
    domain: "www.keepright.at",
    getUrl(lat, lon, zoom) {
      return 'https://www.keepright.at/report_map.php?zoom=' + zoom + '&lat=' + lat + '&lon=' + lon;
    },
  },
  {
    name: "OSM Inspector",
    category: "OSM tools",
    domain: "tools.geofabrik.de",
    getUrl(lat, lon, zoom) {
      return 'http://tools.geofabrik.de/osmi/?view=geometry&lon=' + lon + '&lat=' + lat + '&zoom=' + zoom;
    },
  },
  {
    name: "Who did it?",
    category: "OSM tools",
    domain: "simon04.dev.openstreetmap.org",
    getUrl(lat, lon, zoom) {
		if (Number(zoom)>18) zoom = 18;
      return 'http://simon04.dev.openstreetmap.org/whodidit/?zoom=' + zoom + '&lat=' + lat + '&lon=' + lon;
    },
  },
  // 
  /*
  https://github.com/tankaru/OpenSwitchMaps/issues/11#issuecomment-485388015
  
  http://tools.geofabrik.de/mc/mc.min.js
  
  function updatePermalink(){
	  var a=getPermalink(mc.NumberOfMaps);
	  window.location.href=a;
	  jQuery("#customZoomLevel").html("zoom="+state.maps[0].getZoom());
	  return a
	}

	function getPermalink(c){
	  var d=getPosition();
	  var a="#"+d.zoom+"/"+d.lat.toFixed(4)+"/"+d.lon.toFixed(4)+"&num="+c;
	  for(var b=0;b<mc.NumberOfMapsMax;b++){
		if(state.layers[b]){
		  a+="&mt"+b+"="+state.layers[b].type
		}
	  }
	  if(state.over_layers[0]&&state.over_layers[0]!="none"){
		a+="&mt-1="+state.over_layers[0];
		a+="&mt-1p="+state.percent
	  }
	  if(state.fullscreen){
		a+="&fullscreen=1"
	  }
	  if(key){
		a+="&key="+key
	  }
	  return a
	}
*/
  {
    name: "Map compare",
    category: "OSM tools",
    domain: "tools.geofabrik.de",
    urlPattern: /tools\.geofabrik\.de\/mc/,
    getUrl(lat, lon, zoom) {
      return 'http://tools.geofabrik.de/mc/#' + zoom + '/' + lat + '/' + lon;
    },
    getLatLonZoom(url) {
      const [, zoom, lat, lon] = url.match(/#(\d[0-9.]*)\/(-?\d[0-9.]*)\/(-?\d[0-9.]*)/);
      return [lat, lon, Math.round(zoom)];
    },
  },
  {
    name: "Multimapas",
    category: "OSM tools",
    domain: "javier.jimenezshaw.com",
    urlPattern: /javier\.jimenezshaw\.com/,
    getUrl(lat, lon, zoom) {
      return 'http://javier.jimenezshaw.com/mapas/mapas.html?' + '&c=' + lat + ',' + lon + '&z=' + zoom;
    },
    getLatLonZoom(url) {
      var [, z1, lat, lon, z2] = url.match(/(?:z=(\d{1,2})&)*c=(-?\d[0-9.]*),(-?\d[0-9.]*)(?:&z=(\d{1,2}))*/);
	  if(z1) zoom=z1; else if(z2) zoom=z2; else zoom=10;
	  return [lat, lon, zoom];
    },
  },
  {
    name: "Waymarked Trails",
    category: "OSM tools",
    domain: "hiking.waymarkedtrails.org",
    urlPattern: /\w*\.waymarkedtrails\.org/,
    getUrl(lat, lon, zoom) {
      return 'https://hiking.waymarkedtrails.org/#?map=' + zoom + '!' + lat + '!' + lon;
    },
    getLatLonZoom(url) {
      const [, zoom, lat, lon] = url.match(/(\d{1,2})!(-?\d[0-9.]*)!(-?\d[0-9.]*)/);
      return [lat, lon, zoom];
    },
  },
  {
    name: "BigMap 2",
    category: "OSM tools",
    domain: "osmz.ru",
    getUrl(lat, lon, zoom) {
      return 'http://bigmap.osmz.ru/index.html#map=' + zoom + '/' + lat + '/' + lon;
    },
  },
 {
    name: "Pic4Carto",
    category: "OSM tools",
    domain: "pavie.info",
    urlPattern: /projets\.pavie\.info\/pic4carto\/index\.html/,
    getUrl(lat, lon, zoom) {
      return 'http://projets.pavie.info/pic4carto/index.html?#' + zoom + '/' + lat + '/' + lon;
    },
    getLatLonZoom(url) {
      const [, zoom, lat, lon] = url.match(/#(\d{1,2})\/(-?\d[0-9.]*)\/(-?\d[0-9.]*)/);
      return [lat, lon, zoom];
    },
  },
  {
    name: "Bing",
    category: "Other maps",
    domain: "www.bing.com",
    getUrl(lat, lon, zoom) {
      return 'https://www.bing.com/maps?cp=' + lat + '~' + lon + '&lvl=' + zoom;
    },
  },
  {
    name: "Yahoo Map JP",
    category: "Other maps",
    domain: "map.yahoo.co.jp",
    urlPattern: /map\.yahoo\.co\.jp/,
    getUrl(lat, lon, zoom) {
      return 'https://map.yahoo.co.jp/maps?lat=' + lat + '&lon=' + lon + '&z=' + zoom;
    }, 
    getLatLonZoom(url) {
      const [, lat, lon, zoom] = url.match(/lat=(-?\d[0-9.]*)&lon=(-?\d[0-9.]*)&z=(\d{1,2})/);
      return [lat, lon, zoom];
    },
  },
  {
    name: "MapFan",
    category: "Other maps",
    domain: "mapfan.com",
    urlPattern: /mapfan\.com\/map\/spots/,
    getUrl(lat, lon, zoom) {
      return 'https://mapfan.com/map/spots/search?c=' + lat + ',' + lon + ',' + zoom;
    },
    getLatLonZoom(url) {
      const [, lat, lon, zoom] = url.match(/search\?c=(-?\d[0-9.]*),(-?\d[0-9.]*),(\d{1,2})/);
      return [lat, lon, zoom];
    },
  },
  {
    name: "Mapion",
    category: "Other maps",
    domain: "www.mapion.co.jp",
    getUrl(lat, lon, zoom) {
      return 'https://www.mapion.co.jp/m2/' + lat + ',' + lon + ',' + zoom;
    },
  },
  {
    name: "OSM.de",
    category: "Other maps",
    domain: "www.openstreetmap.de",
    getUrl(lat, lon, zoom) {
      return 'https://www.openstreetmap.de/karte.html?zoom=' + zoom + '&lat=' + lat + '&lon=' + lon;
    },
  },
  {
    name: "IGN GeoPortal(FR)",
    category: "Other maps",
    domain: "geoportail.gouv.fr",
    urlPattern: /www\.geoportail\.gouv\.fr/,
    getUrl(lat, lon, zoom) {
      return 'https://www.geoportail.gouv.fr/carte?c=' + lon + ',' + lat + '&z=' + zoom + '&l0=GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN25TOUR.CV::GEOPORTAIL:OGC:WMTS(1)&permalink=yes';
    },
    getLatLonZoom(url) {
      const [, lon, lat, zoom] = url.match(/c=(-?\d[0-9.]*),(-?\d[0-9.]*)&z=(\d{1,2})/);
      return [lat, lon, zoom];
    },
  },
  {
    name: "Ingress Intel map",
    category: "Other maps",
    domain: "intel.ingress.com",
    getUrl(lat, lon, zoom) {
      return 'https://intel.ingress.com/intel?ll=' + lat + ',' + lon + '&z=' + zoom;
    },
  },
  {
    name: "flightradar24",
    category: "Other maps",
    domain: "flightradar24.com",
    urlPattern: /www\.flightradar24\.com/,
    getUrl(lat, lon, zoom) {
      return 'https://www.flightradar24.com/' + lat + ',' + lon + '/' + Math.round(zoom);
    },
    getLatLonZoom(url) {
      const [, lat, lon, zoom] = url.match(/(-?\d[0-9.]*),(-?\d[0-9.]*)\/(\d{1,2})/);
      return [lat, lon, zoom];
    },
  },
  {
    name: "MarineTraffic",
    category: "Other maps",
    domain: "marinetraffic.com",
    urlPattern: /www\.marinetraffic\.com/,
    getUrl(lat, lon, zoom) {
      return 'https://www.marinetraffic.com/en/ais/home/centerx:' + lon + '/centery:' + lat + '/zoom:' + zoom;
    },
    getLatLonZoom(url) {
      const [, lon, lat, zoom] = url.match(/centerx:(-?\d[0-9.]*)\/centery:(-?\d[0-9.]*)\/zoom:(\d{1,2})/);
      return [lat, lon, zoom];
    },
  },
  {
    name: "Windy.com",
    category: "Other maps",
    domain: "windy.com",
    urlPattern: /www\.windy\.com/,
    getUrl(lat, lon, zoom) {
      return 'https://www.windy.com/?' + lat + ',' + lon + ',' + Math.round(zoom) + ',i:pressure';
    },
    getLatLonZoom(url) {
      const [, lat, lon, zoom] = url.match(/(-?\d[0-9.]*),(-?\d[0-9.]*),(\d{1,2})/);
      return [lat, lon, zoom];
    },
  },
   {
    name: "earth",
    category: "Other maps",
    domain: "earth.nullschool.net",
    urlPattern: /earth\.nullschool\.net/,
    getUrl(lat, lon, zoom) {
      return 'https://earth.nullschool.net/#current/wind/surface/level/orthographic=' + lon + ',' + lat + ',' + 11.1*zoom**3.12;
    },
    getLatLonZoom(url) {
      let [, lon, lat, zoom] = url.match(/orthographic=(-?\d[0-9.]*),(-?\d[0-9.]*),(\d[0-9]*)/);
	  zoom = Math.round((zoom/11.1)**(1/3.12));
      return [lat, lon, zoom];
    },
  },
/*   {
    name: "uMap(Exit only)",
    category: "Other maps",
    domain: "umap.openstreetmap.fr",
    urlPattern: /umap\.openstreetmap\.fr/,
    getUrl(lat, lon, zoom) {
      return 'https://umap.openstreetmap.fr/';
    },
    getLatLonZoom(url) {
      const [, zoom, lat, lon] = url.match(/#(\d[0-9]*)\/(-?\d[0-9.]*)\/(-?\d[0-9.]*)/);
      return [lat, lon, zoom];
    },
  },
 */
  /* {
    name: "map.orhyginal",
    category: "Other maps",
    domain: "orhyginal.fr",
    urlPattern: /map\.orhyginal\.fr/,
    getUrl(lat, lon, zoom) {
      return 'http://map.orhyginal.fr/#' + zoom + '/' + lat + '/' + lon;
    },
    getLatLonZoom(url) {
      const [, zoom, lat, lon] = url.match(/#(\d[0-9]*)\/(-?\d[0-9.]*)\/(-?\d[0-9.]*)/);
      return [lat, lon, zoom];
    },
  },
 */
   {
    name: "OpenSeaMap",
    category: "YP",
    domain: "map.openseamap.org",
//    urlPattern: /map\.openseamap\.org/,
    getUrl(lat, lon, zoom) {
      return 'http://map.openseamap.org/?zoom=' + zoom + '&lat=' + lat + '&lon=' + lon;
    },
/*
    getLatLonZoom(url) {
      const [, zoom, lat, lon] = url.match(/zoom=(\d{1,2})&lat=(-?\d[0-9.]*)&lon=(-?\d[0-9.]*)/);
      return [lat, lon, zoom];
    },
*/
  },
  {
    name: "maps.grade.de",
    category: "YP",
    domain: "maps.grade.de",
//    urlPattern: /maps\.grade\.de/,
    getUrl(lat, lon, zoom) {
      return 'http://maps.grade.de/?zoom=' + zoom + '&lat=' + lat + '&lon=' + lon;
    },
/*
    getLatLonZoom(url) {
      const [, zoom, lat, lon] = url.match(/zoom=(\d{1,2})&lat=(-?\d[0-9.]*)&lon=(-?\d[0-9.]*)/);
      return [lat, lon, zoom];
    },
*/
  },
  {
    name: "FreieTonne",
    category: "YP",
    //urlPattern: /www\.freietonne\.de/,
    getUrl(lat, lon, zoom) {
      return 'https://www.freietonne.de/seekarte/?zoom=' + zoom + '&lat=' + lat + '&lon=' + lon;
    },
  },
  {
    name: "OpenInfraMap",
    category: "YP",
    domain: "openinframap.org",
//    urlPattern: /openinframap\.org/,
    getUrl(lat, lon, zoom) {
      return 'https://openinframap.org/#' + zoom + '/' + lat + '/' + lon;
    },
/*
    getLatLonZoom(url) {
      const [, zoom, lat, lon] = url.match(/#(\d[0-9.]*)\/(-?\d[0-9.]*)\/(-?\d[0-9.]*)/);
      return [lat, lon, Math.round(zoom)];
    },
*/
  },
  {
    name: "OsmHydrant beta",
    category: "YP",
    domain: "www.osmhydrant.org",
    urlPattern: /www\.osmhydrant\.org/,
    getUrl(lat, lon, zoom) {
      return 'http://www.osmhydrant.org/beta/#{"map":{"lat":' + lat + ',"lon":' + lon + ',"zoom":' + zoom + '}}';
    },
/* paramètre trop? spécifique "lon":5.03 (c'est du json)
*/
    getLatLonZoom(url) {
      const [, lat, lon, zoom] = url.match(/%22lat%22:(-?\d[0-9.]*),%22lon%22:(-?\d[0-9.]*),%22zoom%22:(\d[0-9.]*),/);
      return [lat, lon, Math.round(zoom)];
    },
  },
  {
    name: "CartoRadio",
    category: "YP",
    domain: "www.cartoradio.fr",
    urlPattern: /www\.cartoradio\.fr/,
    getUrl(lat, lon, zoom) {
      return 'https://www.cartoradio.fr/#/cartographie/lonlat/' + lon + '/' + lat;
    },
    getLatLonZoom(url) {
      // on a les coordonnées dans le document HTML
      // dommage, ne change pas avec la position de la souris !
      // <section data-v-29123887="" class="single_page" lon="5.71706" lat="46.4397">
      const [, lon, lat] = url.match(/lonlat\/(-?\d[0-9.]*)\/(-?\d[0-9.]*)/);
      return [lat, lon, 15];
    },
  },
  {
    name: "APRS",
    category: "YP",
    domain: "aprs.fi",
    getUrl(lat, lon, zoom) {
      return 'https://aprs.fi/#!lat=' + lat + '&lng=' + lon + '&z=' +zoom;
    },
  },
  {
    name: "OpenRailwayMap",
    category: "YP",
    domain: "www.openrailwaymap.org",
    getUrl(lat, lon, zoom) {
      return 'https://www.openrailwaymap.org/?lat=' + lat + '&lon=' + lon + '&zoom=' +zoom;
    },
  },
  {
    name: "WanderReitKarte",
    category: "YP",
    domain: "www.wanderreitkarte.de",
    getUrl(lat, lon, zoom) {
      return 'https://www.wanderreitkarte.de/index.php?lat=' + lat + '&lon=' + lon + '&zoom=' +zoom;
    },
  },
  {
    name: "OpenAIP",
    category: "YP",
    domain: "maps.openaip.net",
    getUrl(lat, lon, zoom) {
      return 'http://maps.openaip.net/?lat=' + lat + '&lon=' + lon + '&z=' +zoom;
    },
  },
  {
    name: "Historic Object",
    category: "YP",
    domain: "gk.historic.place",
    getUrl(lat, lon, zoom) {
      return 'https://gk.historic.place/historische_objekte/l/en/index.html?lat=' + lat + '&lon=' + lon + '&zoom=' +zoom;
    },
    // parameter to select an OSM object
    // &select=w627188299    
  },
  {
    name: "JOSM",
    category: "YP",
    domain: "www.openstreetmap.org",
    getUrl(lat, lon, zoom) {
      return 'https://www.openstreetmap.org/edit?editor=remote#map=' + zoom + '/' + lat + '/' + lon;
    },
    // TODO
    // https://josm.openstreetmap.de/wiki/Help/RemoteControlCommands
  },
   {
    name: "Wizard",
    category: "YP",     //todo hide the wizard from tab
    urlPattern: /.*/,   //todo don't respond to all site, just maps
/*
    getUrl(lat, lon, zoom) {
      return null;
    },
*/
     getLatLonZoom(url) {

      try {
      	// tools.geofabrik.de/mc
      	// bigmap.osmz.ru
      	// maps.gsi.go.jp
      	// qwant
      	// pic4carto
      	// flightradar24
      	
		const [, zoom, lat, lon] = url.match(/(\d[0-9.]*)[\/,](-?\d[0-9.]*)\/(-?\d[0-9.]*)/);
		console.log("regex 1 lat:" + lat + " lon:" + lon + " zoom:" +zoom);
		return [lat, lon, Math.round(zoom)];
	  }
	  catch(e) {console.log("pas regex 1");};

      try {
        // aprs.fi
        // yahoo.co.jp
        // keepright
        // whodidit
        // openstreetmap.de
        // f4map
        // mapillary
        // osmose
        // osm inspector (osmi)
        // adresse.data.gouv.fr
        // bbbike.org/mc
        
/*
        var [, z1, lat, lon, z2] = url.match(/(?:z(?:oom)?=(\d{1,2})&)?lat=(-?\d[0-9.]*)&l(?:on)?(?:ng)?=(-?\d[0-9.]*)(?:&z(?:oom)?=(\d{1,2}))?/);
	    if(z1) zoom=z1; else if(z2) zoom=z2; else zoom=10;
*/
        var [, lat] = url.match(/lat=(-?\d[0-9.]*)/);
        var [, lon] = url.match(/(?:lon|lng)=(-?\d[0-9.]*)/);
        try {
          var [, zoom] = url.match(/(?:zoom|z)=(\d{1,2})/);
        }
        catch(e) {zoom=10;}
		console.log("regex3 lat:" + lat + " lon:" + lon + " zoom:" +zoom);
	    return [lat, lon, zoom];
	  }
	  catch(e) {console.log("pas regex 3");};
	  
      try {
        // mapas
        // geoportail (lon/lat inversé !!)
        // intel
        // bing
        // yandex

        var [, lat, lon, zoom] = url.match(/(?:c|ll|cp|)=(-?\d[0-9.]*)(?:,|~|%2C)(-?\d[0-9.]*)(?:&(?:z|lvl|^,)=(\d{1,2}))/);
		console.log("regex4 lat:" + lat + " lon:" + lon + " zoom:" +zoom);
	    return [lat, lon, zoom];
	  }
	  catch(e) {console.log("pas regex 4");};
	  
      try {
        // mapfan
        // openstreetcam
        // mapion
        // overpass-turbo
        // windy
        // earth (zoom factor et projection // !)
        
        var [, lat, lon, zoom] = url.match(/(-?\d[0-9.]*)[,;](-?\d[0-9.]*)[,;](\d{1,2})/);
		console.log("regex5 lat:" + lat + " lon:" + lon + " zoom:" +zoom);
	    return [lat, lon, zoom];
	  }
	  catch(e) {console.log("pas regex 5");};

    },
  },

];
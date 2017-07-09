var serialport = require('serialport'),
    plotly = require('plotly')('chaitanya.krishna','pnpxkcuug7'),
 tokens = ['l41l64jt4f', '8qcysoteto','voxyxog1pu','4qc6iwvup9','6zrk6i4cc7','ac2dcojfyu','tpa765mei3'];


 var portName = 'COM23';
 var sp = new serialport(portName,{
 baudRate: 9600,
 dataBits: 8,
 parity: 'none',
 stopBits: 1,
 flowControl: false,
 parser: serialport.parsers.readline("\r\n")
 });

// helper function to get a nicely formatted date string
function getDateString() {
    var time = new Date().getTime();
   
    var datestr = new Date(time +20000000).toISOString().replace(/T/, ' ').replace(/Z/, '');
    return datestr;
}
//creating subpolt with multiple data streams
var initdata = [ {name: 'Temprature in celsius', x:[], y:[], stream:{token:tokens[0], maxpoints: 1500}}, 
                 {name: 'Humidity', x:[], y:[], stream:{token:tokens[1], maxpoints: 1500}},
                 {name: 'Temprature in Farenheit', x:[], y:[], stream:{token:tokens[2], maxpoints: 1500}},				 
				 {name: 'HeatIndex in celsius ', x:[], y:[], stream:{token:tokens[3], maxpoints: 1500}}, 
				  {name: 'HeatIndex in Farenheit ', x:[], y:[], stream:{token:tokens[4], maxpoints: 1500}}, 
				 {name: 'Soil moisture', x:[], y:[], stream:{token:tokens[5], maxpoints: 1500}},
				  {name: 'Rain Fall', x:[], y:[], stream:{token:tokens[6], maxpoints: 1500}}];
var initlayout = {fileopt : "extend", filename : "sensor4"};
 plotly.plot(initdata, initlayout, function (err, msg) {
 if (err) return console.log(err)

 console.log(msg);

 // creating six streams
 var streams = {
 'Temprature in celsius' : plotly.stream(tokens[0], function (err, res) {
    if (err) console.log(err);
    console.log(err, res);
    }),
 'Humidity' : plotly.stream(tokens[1], function (err, res) {
    if (err) console.log(err);
    console.log(err, res);
    }),
	'Temprature in Farenheit' : plotly.stream(tokens[2], function (err, res) {
    if (err) console.log(err);
    console.log(err, res);
    }),

   'HeatIndex in celsius' : plotly.stream(tokens[3], function (err, res) {
    if (err) console.log(err);
    console.log(err, res);
    }),
	'HeatIndex in Farenheit' : plotly.stream(tokens[4], function (err, res) {
    if (err) console.log(err);
    console.log(err, res);
    }),

   'Soil moisture' : plotly.stream(tokens[5], function (err, res) {
    if (err) console.log(err);
    console.log(err, res);
    }),
	'Rain Fall' : plotly.stream(tokens[6], function (err, res) {
    if (err) console.log(err);
    console.log(err, res);
    })

   };
    sp.on('data', function(input) {



  var values = input.split('\t');

// writing the Temprature in celsius stream
   var TempStreamObject = JSON.stringify({ x : getDateString(), y :   values[0] });
 console.log('TempSensorObject: ' + TempStreamObject);
 streams['Temprature in celsius'].write(TempStreamObject + '\n');

   // writing the Humidity stream
   var HumidityStreamObject = JSON.stringify({ x : getDateString(), y :     values[1] });
 console.log('HumiditySensorObject: ' + HumidityStreamObject);
 streams['Humidity'].write(HumidityStreamObject + '\n');
 // writing the Temprature in Farenheit stream
   var TempfStreamObject = JSON.stringify({ x : getDateString(), y :   values[2] });
 console.log('TempfSensorObject: ' + TempfStreamObject);
 streams['Temprature in Farenheit'].write(TempfStreamObject + '\n');

 //  writing the HeatIndex stream
 var HeatStreamObject = JSON.stringify({ x : getDateString(), y :    values[3] });
  console.log('HeatSensorObject: ' + HeatStreamObject);
  streams['HeatIndex in celsius'].write(HeatStreamObject + '\n');
  //  writing the HeatIndex stream
 var HeatfStreamObject = JSON.stringify({ x : getDateString(), y :    values[4] });
  console.log('HeatfSensorObject: ' + HeatfStreamObject);
  streams['HeatIndex in Farenheit'].write(HeatfStreamObject + '\n');

   //writing Soil moisture  stream
   var SoilStreamObject = JSON.stringify({ x : getDateString(), y :    values[5] });
    console.log('SoilSensorObject: ' + SoilStreamObject);
    streams['Soil moisture'].write(SoilStreamObject + '\n');
 //writing Rain Fall  stream
   var RainFallObject = JSON.stringify({ x : getDateString(), y :    values[6] });
    console.log('RainFallObject: ' + RainFallObject);
    streams['Rain Fall'].write(RainFallObject + '\n');


    });
    });
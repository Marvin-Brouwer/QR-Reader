//http://danielmclaren.com/2008/03/embedding-base64-image-data-into-a-webpage

package;
import by.blooddy.crypto.image.JPEGEncoder;
import flash.display.Bitmap;
import flash.display.BitmapData;
import flash.display.Loader;
import flash.display.StageQuality;
import flash.events.Event;
import flash.geom.Matrix;
import flash.geom.Rectangle;
import flash.media.Camera;
import flash.media.Video;
import flash.Lib;
import flash.events.StatusEvent;
import flash.events.TimerEvent;
import flash.utils.ByteArray;
import flash.utils.Timer;
import flash.Vector;
import by.blooddy.crypto.Base64;
import PNGEncoder2;

@:final
class CameraManager
{
	private var _display:Video;
	private var _cameras: Array<Camera> = new Array();
	private var _selectedCamera :Int = 0;
	private var _eventManager :EventManager;

	public function new(eventManager :EventManager) 
	{
		_eventManager = eventManager;
		_eventManager.addEventListener(EventManager.PauseCaptureEvent, function(e:Event) {
			Lib.current.stage.quality = StageQuality.LOW;
			getActiveCamera().setQuality(6400, 50);
		});
		_eventManager.addEventListener(EventManager.ResumeCaptureEvent, function(e:Event) {
			Lib.current.stage.quality = StageQuality.HIGH;
			getActiveCamera().setQuality(0, 0);
		});
		setupCameras();
		setupStage();
		setSize();
	}
	
	private function setupCameras() : Void {
		if(!Camera.isSupported){
			_eventManager.videoNotSupported();	
			return;
		}
		var cameraList = Camera.names; 
		for (cameraName in cameraList) { 
			var camera = Camera.getCamera("" + cameraList.indexOf(cameraName));
			if (camera == null) continue;
			_cameras.push(camera);
		}
		if(_cameras.length == 0){
			_eventManager.videoDenied();
			return;
		}
	}
	private function getActiveCamera() : Camera {
		//trace(_cameras[_selectedCamera].name);
		return _cameras[_selectedCamera];
	}
	
	private function setupStage() : Void {
		var stage = Lib.current.stage;
		_display = new Video();
		stage.addChild(_display);		
		var initialCamera = getActiveCamera();
		_display.attachCamera(initialCamera);
		
		if(initialCamera.muted){
			initialCamera.addEventListener(StatusEvent.STATUS, function(e:StatusEvent){
			if(initialCamera.muted){
				_eventManager.videoDenied();
				trace('Camera denied');
				return;
			}
				trace('Camera allowed');
			_eventManager.videoAllowed();
			record();
		}, false, 0, true); }
		else {
			_eventManager.videoAllowed();
			record();
		}
	}
	
	private function setSize():Void {
		var width = Std.int(Lib.current.stage.fullScreenWidth);
		var height = Std.int(Lib.current.stage.fullScreenHeight);
		
		_display.width = width;
		_display.height = height;
		
		var camera = getActiveCamera();
		camera.setMode(width, height, 30);
	}
	
	private function record() {
		var _timer = new Timer(2500);
		_timer.addEventListener(TimerEvent.TIMER, function(event:TimerEvent) {
			if (!EventManager.IsCapturing()) return;
			var camera = getActiveCamera();	
			var bitmap = new BitmapData(camera.width, camera.height, false, 0x000000);
			var scale = 0.50;
			var data = new ByteArray();
			var matrix:Matrix = new Matrix();
			camera.drawToBitmapData(bitmap);
			
			matrix.scale(scale, scale);

			var smallBMD:BitmapData = new BitmapData(
				Math.round(bitmap.width * scale), 
				Math.round(bitmap.height * scale), 
				true, 0x000000);
			smallBMD.draw(bitmap, matrix, null, null, null, true);
			smallBMD.copyPixelsToByteArray(
				new Rectangle(0, 0, smallBMD.width, smallBMD.height),
				data);
				
				//var jpeg = JPEGEncoder.encode(smallBMD);
				//var pngBytes:ByteArray = PNGEncoder.encode(smallBMD);
			var encoder = PNGEncoder2.encodeAsync(smallBMD);
			
			encoder.addEventListener(Event.COMPLETE, function (e:Event) { 
				var base64data = Base64.encode(encoder.png);
				_eventManager.exportData("data:image/png;base64,"+base64data);
			} );
		});
		
		_timer.start();
	}
}
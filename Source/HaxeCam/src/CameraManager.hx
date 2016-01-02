package;
import flash.display.Bitmap;
import flash.display.BitmapData;
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

//import com.G4Num;
//import com.QRreaderEvent;
//import com.QRdecoderEvent;
//import com.QRdecode;
//import com.GetQRimage;
//import com.QRdecode;

@:final
class CameraManager
{
	private var _display:Video;
	private var _cameras: Array<Camera> = new Array();
	private var _selectedCamera :Int = 0;
	private var _eventManager :EventManager;
	//private var _getQRimage:GetQRimage;
	//private var _qrDecode:QRdecode = new QRdecode();

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
		var _timer = new Timer(1500);
		_timer.addEventListener(TimerEvent.TIMER, function(event:TimerEvent) {
			if (!EventManager.IsCapturing()) return;
			var camera = getActiveCamera();	
			var bitmap = new BitmapData(camera.width, camera.height, false, 0x000000);
			var scale = 0.50;
			var data = new ByteArray();
			var matrix:Matrix = new Matrix();
			matrix.scale(scale, scale);

			var smallBMD:BitmapData = new BitmapData(
				Math.round(bitmap.width * scale), 
				Math.round(bitmap.height * scale), 
				true, 0x000000);
			smallBMD.draw(bitmap, matrix, null, null, null, true);
			camera.drawToBitmapData(smallBMD);
			smallBMD.copyPixelsToByteArray(
				new Rectangle(0, 0, smallBMD.width, smallBMD.height),
				data);
				
			var base64data = Base64.encode(data);
			if (!EventManager.IsCapturing()) return;
			_eventManager.exportData(""+base64data);
			//
			//trace('startind read');
			 ////set DisplayObject contains a QR Code
			//_getQRimage = new GetQRimage(new Bitmap(smallBMD)); // imageSrc:DisplayObject(Sprite, Video, …)
			 ////run onQrImageReadComplete when the QR Code is found
			//_getQRimage.addEventListener(QRreaderEvent.QR_IMAGE_READ_COMPLETE, onQrImageReadComplete);
			 ////begin recognition. you may run this every frame when the image source is viewed by a webcam.
			//_getQRimage.process();
		});
		
		_timer.start();
	}
	//// invoked when QR Code is found
	//private function onQrImageReadComplete(e:QRreaderEvent):Void {
		//_getQRimage.removeEventListener(QRreaderEvent.QR_IMAGE_READ_COMPLETE, onQrImageReadComplete);
		//
		//trace('startind decode');	
		//// set 2D bit array of QR Code
		//_qrDecode.setQR(e.data); // e:QRreaderEvent
		//// run onQrDecodeComplete when decoding is complete
		//_qrDecode.addEventListener(QRdecoderEvent.QR_DECODE_COMPLETE, onQrDecodeComplete);
		//// begin decoding
		//_qrDecode.startDecode();
	//}
	//// invoked when decoding is complete
	//private function onQrDecodeComplete(e: QRdecoderEvent):Void {
		//_qrDecode.removeEventListener(QRdecoderEvent.QR_DECODE_COMPLETE, onQrDecodeComplete);
		//
		//trace('finished decode');
		//// e.data is the string decoded from QR Code
		//trace(e.data);
		//_eventManager.exportData(""+e.data);
	//}
}
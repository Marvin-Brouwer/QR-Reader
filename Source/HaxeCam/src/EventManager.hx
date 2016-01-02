package;

import flash.errors.Error;
import flash.events.Event;
import flash.events.EventDispatcher;
import flash.external.ExternalInterface;
import flash.Lib;

@:final
class EventManager extends EventDispatcher 
{
	private var	_allowedMethodName:String;
	private var	_deniedMethodName:String;
	private var	_videoNotSupportedName:String;
	private var	_exportDataMethodName:String;
	private static var _current:EventManager;
	private static var _isCapturing: Bool = true;
	
	public static var PauseCaptureEvent:String = "PauseCaptureEvent";
	public static var ResumeCaptureEvent:String = "ResumeCaptureEvent";
	
	public static function IsCapturing():Bool {
		return _isCapturing;	
	}


	public function new(
		allowedMethodName:String,
		deniedMethodName:String,
		videoNotSupportedName:String,
		exportDataMethodName:String) 
	{
		super();
		if(ExternalInterface.available){
			ExternalInterface.marshallExceptions = true;		
			setExternalEvents();
			setListeners();
		}

		_allowedMethodName = allowedMethodName;
		_deniedMethodName = deniedMethodName;
		_videoNotSupportedName = videoNotSupportedName;
		_exportDataMethodName = exportDataMethodName;
		
		_current = this;
	}
	
	public function videoAllowed():Void {
		if (_allowedMethodName == null) return;
		ExternalInterface.call(_allowedMethodName);
	}
	public function videoDenied():Void {
		if (_deniedMethodName == null) return;
		ExternalInterface.call(_deniedMethodName);
	}
	public function videoNotSupported():Void {
		if (_videoNotSupportedName == null) return;
		ExternalInterface.call(_videoNotSupportedName);
	}
	public function exportData(data :String):Void {
		if (_exportDataMethodName == null) return;
		ExternalInterface.call(_exportDataMethodName, data);
	}
	
	private function setExternalEvents() {
		var _root = Lib.current.root;
		//_root.refPauseCapture = pauseCapture;
		//_root.refResumeCapture = resumeCapture;
		try{
			ExternalInterface.addCallback("flashPauseCapture", EventManager.pauseCapture);
			ExternalInterface.addCallback("flashResumeCapture", EventManager.resumeCapture);
		}catch (e:Error) {
			trace(e.message);	
		}
	}
	
	private function setListeners() {
		var _root = Lib.current.root;
		_root.addEventListener(Event.ACTIVATE, function (e:Event) { EventManager.resumeCapture(); } );
		_root.addEventListener(Event.DEACTIVATE, function (e:Event) { EventManager.pauseCapture();} );	
	}
	
	public static function pauseCapture():String {
		if (!EventManager._current.hasEventListener(EventManager.PauseCaptureEvent) || !_isCapturing) return "No action taken";
		_isCapturing = false;
		EventManager._current.dispatchEvent(new Event(EventManager.PauseCaptureEvent));
		return "Capturing paused";
	}
	public static function resumeCapture():String {
		if (!EventManager._current.hasEventListener(EventManager.ResumeCaptureEvent) || _isCapturing) return "No action taken";
		_isCapturing = true;
		EventManager._current.dispatchEvent(new Event(EventManager.ResumeCaptureEvent));
		return "Capturing resumed";
	}
	
	
}
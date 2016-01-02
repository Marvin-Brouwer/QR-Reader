package;

import flash.display.StageAlign;
import flash.display.StageQuality;
import flash.display.StageScaleMode;
import flash.errors.Error;
import flash.Lib;

class Main 
{
	
	static function main() 
	{
		var stage = Lib.current.stage;
		stage.scaleMode = StageScaleMode.NO_SCALE;
		stage.align = StageAlign.TOP_LEFT;
		// Entry point
		try{
			var params:Dynamic<String> = flash.Lib.current.loaderInfo.parameters;
			// quick way to trace them all:
			trace("param named name is :" + params.name);
			trace(haxe.Serializer.run(params));
			
			var eventManager = new EventManager(
				params.allowedMethod,
				params.deniedMethod,
				params.notSupportedMethod,
				params.exportDataMethod
			);
			var cameraManager = new CameraManager(eventManager);
		}
		catch (e:Error) {
			trace("Unhandled error: " + e.message);	
		}

	}
	
}
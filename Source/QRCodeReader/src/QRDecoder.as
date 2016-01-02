package 
{
	import com.QRdecoderEvent;
	import com.QRreaderEvent;
	import com.LabelingClass;
	import com.G4Num;
	import com.G8Num;
	import com.GetQRimage;
	import com.GFstatic;
	import com.QRCodeDetecter;
	import com.QRdecode;
	import flash.display.Bitmap;
	import flash.display.Sprite;
	
	public final class QRDecoder extends Sprite
	{
		private var _qrdecoderEvent: QRdecoderEvent;
		private var _qrreaderEvent: QRreaderEvent;
		private var _labelingClass: LabelingClass;
		private var _g4Num: G4Num;
		private var _g8Num: G8Num;
		private var _gFstatic: GFstatic;
		private var _qrdecode: QRdecode;
		private var _callBack:Function;
		private var _getQRimage:GetQRimage;
		private var _qrDecode:QRdecode = new QRdecode();
		
		public static function Main() {
			
		}
		
		public function decode(bmp :Bitmap, callback: Function) {
			
			_callBack = callback;
			// set DisplayObject contains a QR Code
			_getQRimage = new GetQRimage(bmp); // imageSrc:DisplayObject(Sprite, Video, …)
			// run onQrImageReadComplete when the QR Code is found
			_getQRimage.addEventListener(QRreaderEvent.QR_IMAGE_READ_COMPLETE, onQrImageReadComplete);
			// begin recognition. you may run this every frame when the image source is viewed by a webcam.
			_getQRimage.process();
		}
		// invoked when QR Code is found
		private function onQrImageReadComplete(e:QRreaderEvent):void{
			_getQRimage.removeEventListener(QRreaderEvent.QR_IMAGE_READ_COMPLETE, onQrImageReadComplete);
			// set 2D bit array of QR Code
			_qrDecode.setQR(e.data); // e:QRreaderEvent
			// run onQrDecodeComplete when decoding is complete
			_qrDecode.addEventListener(QRdecoderEvent.QR_DECODE_COMPLETE, onQrDecodeComplete);
			// begin decoding
			_qrDecode.startDecode();
		}
		// invoked when decoding is complete
		private function onQrDecodeComplete(e: QRdecoderEvent):void{
			_qrDecode.removeEventListener(QRdecoderEvent.QR_DECODE_COMPLETE, onQrDecodeComplete);
			// e.data is the string decoded from QR Code
			trace(e.data);
			//_eventManager.exportData(""+e.data);
			_callBack(e.data);
		}
		
	}

}
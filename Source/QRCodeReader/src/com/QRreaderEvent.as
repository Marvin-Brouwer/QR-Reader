/**************************************************************************
* LOGOSWARE Class Library.
*
* Copyright 2009 (c) LOGOSWARE (http://www.logosware.com) All rights reserved.
*
*
* This program is free software; you can redistribute it and/or modify it under
* the terms of the GNU General Public License as published by the Free Software
* Foundation; either version 2 of the License, or (at your option) any later version.
*
* This program is distributed in the hope that it will be useful, but WITHOUT
* ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
* FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License along with
* this program; if not, write to the Free Software Foundation, Inc., 59 Temple
* Place, Suite 330, Boston, MA 02111-1307 USA
*
**************************************************************************/ 
package com
{
	import flash.display.BitmapData;
	import flash.events.Event;
	
	/**
	 * QR????????????????????
	 */
	public class QRreaderEvent extends Event
	{
		// ??( Class constants )
		
		/**
		 * QR???????????????
		 * @eventType QR_IMAGE_READ_COMPLETE
		 **/
		public static const QR_IMAGE_READ_COMPLETE:String = "QR_IMAGE_READ_COMPLETE";

		// ?????( Proerties )
		
		/**
		 * ???????QR????????????
		 **/
		public var imageData:BitmapData;
		/**
		 * ???????QR??????????????????????
		 **/
		public var data:Array;
		/**
		 * ????????????????(?????)
		 **/
		public var checkArray:Array;

		// ???????( Constructor )
		
		/**
		 * ???????
		 * @param type ???????
		 * @param imageData ????QR?????
		 * @param data ????QR????????
		 * @param check ??????????
		 **/
        public function QRreaderEvent(type:String, imageData:BitmapData, data:Array, checkArray:Array = null){
            super(type);
            // ?????????????
           this.imageData = imageData;
           this.data = data;
           this.checkArray = checkArray;
        }

        // Event???????????????( Overridden Method: Event )

        /**
        * @private
        **/
        override public function clone():Event {
            return new QRreaderEvent(type, imageData, data, checkArray);
        }
	}
}